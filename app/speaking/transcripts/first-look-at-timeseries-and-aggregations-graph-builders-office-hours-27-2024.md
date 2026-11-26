---
source: YouTube auto-generated captions
uploaded: 2024-03-04
duration: 2468
---

[00:01] yeah hi everybody Welcome to the graph Builders office hours I don't
know which I like which number it is we did quite a lot already um so the team
is mostly in Denver that's why I'm I'm taking over but we also have like a very
interesting topic to dive into that is time series and aggregations on subgraphs
this is a new feature I think it's in the making since several years um I think
I saw the first draft when I started three years ago of how this could be
specified and now I think yesterday it landed in graph node in a in a developer
preview so to say um and so I took the opportunity to uh jump into this today
and uh try to make a first presentation so it's really a first look the whole
specification is also could also be changed as how I understand it but um it
works so it's very exciting uh to to start uh yeah as I said like I I'm just to
I I was able to maybe block today one no in two or three hours to to to try it
out and initially I ran into problems but then

[01:15] eventually I was able to figure it out and have a working function or
solution um yeah but what I would do actually is to together we do live coding
and um and yeah yeah so but I can give you a quick overview so what what's going
on so basically it I would say it's configuration over code um by the way we
have David Luther cord and Leo uh schwarzenstein from the graph not team in the
call so and you and everybody else like feel free to always just interrupt me if
I say something wrong or if if you um also like for the rest of the audience if
I should uh dig into something a little bit more uh I I like to have this more
as a workshop and interactive than just me uh talking to to a screen okay um so
yeah configuration of our code so the reason is there are common patterns uh
that that we see to emerge and we look at subgraph code and and one of those is
time series um time series you probably know mostly um is when when we try to do
draw

[02:28] Candlestick bars or bar charts and um charts in general um that's when
we when we need time time series series data so it's simply let let's say a
token price um to not talk about token prices um a token price like is usually
the price defined like every every time a token gets swapped the price usually
adjusts a little bit right so we can look at the Swap events on chain and then
see uh what was the price but if you want to make a a CH part that looks um
through the last I know say 100 days we don't need to necessarily have every
swap in in that chart we want to have maybe one price per day or one price per
hour or one price per week or something like that and in order to do that we
need to aggregate so we look at all the swaps that happened in that day and then
we take an average or um or a Max or a Min whatever we want these are
aggregation simply said um it's very common uh especially Unis swap uses a lot
of these famously but also we see that in a lot of other subg so the idea was
like really to build uh a tool that subcraft developers can use to work with

[03:43] these patterns that then the graph node can heavily optimize for um that
improves indexing and query performance for these common patterns um it's
thinkable that other patterns will also land eventually in the graph noes we
open for suggestions but for now we um we look at this ocations so it's the
Builder office ours so let's not talk too much let's look directly into code um
how does it look like um we have here I Ed as an example the crypto Punk
subgraph or the Crypt Punk's contract so we have here the punk B entity um so
the it's it's a cool contract to to work with because like it's an nft contract
that also has um the trades on chain um is also easily digestable I mean all the
trades are on chain but um it's it's there is this Punk B event otherwise
there's just a transfer event and they need to find out was it a cell or just
like Ascend um what changes here is that we annotate as entity but also we say
like time series is true that implies that makes that entity also immutable so

[04:59] that's the First Step so we take one entity that already exists and say
it's time series through then what's special is we need to have the ID set as
in8 and also the time stamp set as int 8 both these fields are set by the
aggregation so we don't need to set them in the mappings as we see later um then
the second the second thing is that we we do the agregation en so this is that
kind of the the raw data and here we we write the aggregation entity this is
special so we have now an aggregation um annotation here that we can select
interval so we do two we do hourly and daily intervals and we then we say which
source entity um we want to use so it it links to this one and then also the
aggregation have like IDs and time stamp as int 8 defined and then this is free
so what I do is like I to have a volume here I wanted to see for every hour or
every day um how much um yeah how many punks are actually traded so we see a
volume of of of

[06:13] crypto Punk trades on CH we could also do like a price chart or whatever
but I started with a volume because it's you know it's very simple um and let's
have a quick look at the mappings so as I said like this one is pretty much the
same so it's just like an event that gets emitted to handle Punk Bo that we
still have the the event here then we we create the entity but as we don't give
it an ID so the ID is managed by the graph node um this is done because like
these these entities need to be sorted according to I think when they are uh
emitted um so we give an empty string here and um that works and then the time
stamp as I said we don't need to set but the rest um we can do whatever we want
like we could even have like a much more complex Handler here uh these are just
like the two specialities um and yes and then in the end with that we end up
with a query so we have a stats collection we can set the interval hour that's
also new we say the we see the volume in the time stamp and then um yeah that's
in the graphical

[07:25] query but I would say we just jump into code are the questions so far I
know Paka is in Paka are you in Denver like at the at the conference uh I have
I'm going after this I'm at the Airbnb right now yeah I'm in Denver oh cool nice
thanks for coming over so yeah let's do live coding this a little bit bigger
okay so I'm here in my uh folder where I have my code and so the the first thing
is what I do is I check my My Graph version so in order to leverage this feature
we really need to have like the latest graph CLI installed which is as of today
0.684 not sure if it's in older versions that would be available but anyways
from now on we can use this one so that's um sorry do you have a question s hunt

[08:37] you okay what's the question I hear I don't hear you well so maybe it's
better you type the question into the chat um no okay all right um so how it
works so we can just do graph in it and when we do graph in it uh we can just
kind of set set up a new subgraph so I would just say like okay let's take
ethereum we take the host service subgraph slug is that aggregation yeah I like
to do long names okay okay I can create the directory I check the the the eum
network and then I can simply go to either

[09:48] scan find the crypto punks uh contract this one paste I don't know after
four retries we have to start block and it's best practice to also give the
contract a good contract name I also want to always start the index contract
events entities and that's it so I can initialize like a very simple sub graph
already then start to look at the code okay so what happened here we have like a
normal subgraph we have a subra yal we have these events that the contract has
the schema autogenerated so so far nothing special I don't think we need to
deploy that one

[11:01] because it's really not special but in order to go into the aggregations
I can go with that version one up now I need to peek in the spec yeah 1.1 so by
the way use the spec I can share with you um so I need to increase this one and
I think that's it and then I can just say as a first step I can just go and say
like pipe buk board and then switch to I think it was uh time series through and
then switch right to but um inate and add another one that's a Time St and eight
okay let's see what happens so if if that's really the first step uh we have a
now just like an an entity the best would like it's an easy easy start to

[12:14] have like an an entity for a for an event and then so just add that one
add and this one change okay and then we can see what happen so what I do then
next is um I can do the code gen and build and see if it's still working oops no
so what happened um so clearly we changed the type to int8 here of ID so that
the mapping doesn't work anymore that's actually that's simple so we can go in
here I create the codeen and and see here it already tells me where the problem
is so it's the problem is here see because before it was bites um and now it's
in8 so that's not compatible anymore but anyways we we are good with um empty
string here so it's simple as

[13:27] just change it to the string um and then just try again oh cool that
compiles so we now have that one annotated as uh this one annotated As Time
series so now I would be curious to see what happens if just uh deploy that one
we go to theg gra.com Studio Lin then we can just like uh I create a new
subgraph uh usually I just need the init command oh so I have to later on switch
my API key and then I can just deploy basically I'll be

[14:40] cool I me so now in the background it probably starts to index that up
so oh interesting no so the standard is oh it's just retry whatever reason I saw
this so Tong up recently yeah here we go uh cool now we see it's syncing we can
go into the logs there is stuff going on uh we see the entity count should go up
eventually I think initially in the crypto pun subc there just a signs but the
reason why I'm doing this is actually because I want to show you

[15:52] already what we see here what's happening in the schema because we oh
actually hon PS oh before it already had an entity anyways but this indexes I
can just whatever CBC some my signs so that's actually that looks good my test I
saw already a special entity here but maybe no anyways okay let's move forward
any questions no um so the next step would be to do create this agregation at so
I can just copy paste that over um so we write a stats entity give it and then
Market as aggregation I said let's do the intervals hour and day that's good and
the source I need to bring that over um ID is already here Time s is already
here but what I want to hear is

[17:08] um yeah we want have to to follow you so we we also name this volume and
then we can do the sum but we do it over so the over value so we also need to
change it's so it's begin so we need to change to begin here that that needs to
have the same type as the field that we want to Aggregate and then I can just
say it's the value field um I think that should already work actually so let's
see the first text IM is always um yarn Cen and yarn build so to see like that
that looks good it's also interesting to see like the type stats although we
Define it here in the in the schema we don't find it in the in the generated uh
stuff so the stats is not something that we can that we need to do something
about it in the in the mappings or we can import or read from or something like
that it's an entity that is solely here for

[18:20] querying um but that's what we see so here we entity we see the
aggregation okay so let's see if we can deploy it again okay and that looks good
let's see if you see this schem change now yes yeah so we have stats collection
see and then we can say the interval and the time so now the problem is
obviously that that that the cryptops are pretty old um contract and to index it
it takes probably know several hours first but there is a trick that we can do

[19:31] here and that is we just go back in time say yeah let's go let's go uh
four days back oh actually we need more 18 18 days so we have some weeks we
would have some weeks and some days right oh we don't have a weak interval
anyways um but what we can do is we can just change the start plock um it's not
that like a it's not very wrong to change the star plock to something recent
unless we really need

[20:45] to have the early the early stuff in here but for that for what you want
to do right now it's just getting out some aggregations can actually do that so
let's just redeploy again think I'm at version three now and let's see how quick
it can get some acties here uh in the meantime I might want to send you over the
I this one um I also have an example repo prepared that you can see at the end
of this one it has any some links so he here uh actually I really

[21:59] did this step by step until um to to build up and so you have the same
thing here but what would be cool is actually to look into the one that I
published I published already one to the network that that basically does the
same we can also go in this playground and see what's happening so on the right
side we see um again the statistics and so we can get the hourly interval and
look at the time cement volume I see here we have them that worked um but
actually I don't know why we have time series here because I don't have it in
this one and let see so here we already have also in in the studio I can also go
into this stats collection

[23:16] and running yes nice okay um that's the very very basic um example we
can extend it together if you want or we can also have some questions any
questions in the room so far no hey um so then I take the opportunity so so to
ask so that I can ask questions or I have a question for David actually okay
yeah go ahead nice um so why do I see here the time series collection yeah I um
so that um I mean I assume you had a Time series type in your scha right it

[24:29] shouldn't if it just created a Time series type all by itself then
that's a bug but you know one of the one of the bugs that was fixed recently was
um or as part of the aggregation was it used to be if you had an entity type
that that whose name is already plural like time um like stats for example um or
basically if we lose use some Library internally to pluralize the name name of
the type to to generate these the the API schema um and so if you add you know a
stat stats type um both the singular and plural are the same and so you would
only get one of those those query Fields um and now it makes it so that if you
have a type that's already plural um it uses for the collection it uses that
type name underscore collection um to disambiguate it yeah I okay now I know why
it's here because I played around with this interface okay yeah yeah I'm few so
it's not a bug yeah okay but since that that pluralization Library tells us that
you the plural of Time series is time

[25:42] series um we yeah we generate for the for the query field where you can
get many of them you that name underscore collection yeah okay that makes sense
yeah exactly or we would do stats SE is par yeah so in my in the example I think
I used statistics yeah okay cool um D it's very helpful so if I have an event
named blocks it will be generated as blocks collection exactly yeah yeah it's by
the type name right like you have a type in your schema that's called blocks
then you would have in your in your query schema you would have a field blocks
to get one of those entities and a field blocks collection to do all the you
know first last wear on so own filtering yeah cool so we can actually try this
out um so you see currently I have the stats collection right because

[26:58] I have it here in written stats but if I remove this S I assume that
that Library would see it as not pluralized now I can just um deploy version
four okay I think we need to talk with the team about this second time it
happens but I think they they are now uh currently working on something so it
could be that the index nodes are restarted or something like that um try again
nice after two times okay um so we have it's already version four I think to
refresh the Keo we need to uh refres like to get the schema we

[28:14] need to refresh but see now we have stats yeah so we have this proven um
yeah we can probably try to do a little more comp arations together I really go
back into into this mode like that that's what I have prepared yeah I can um I
did like a dumb I don't know if you saw that I did a dumb subgraph that
Aggregates is thean block numbers um that also the this one um and it's yeah
it's not very useful but if you if you open the schema for it there's there's
some more aggregations in there so we have a you a block and a block time entity
that's yeah the interesting thing in there is just the the block number um in
the sub graph is a block Handler so in every block we create um one of the block
time and one of the block entities okay and we also artificially set these
groups here as block number mod 10 what 100 what 1,000 just to to

[29:30] have some things to groove by um and then if you go down to I don't know
um yeah this so the stats entity what you can do with aggregations you can use
the same time series to aggregate over everything or over only some values like
the stats entity because it doesn't have any of these groups in it will
aggregate over everything like it will count everything it'll get the max and
Min of the the number in that time interval and then yeah group one for example
because it has that group one field in it right and because group one is block
number mod 10 there'll be 10 different groups um and so now the count for
example yeah for group number one will only count blocks whose block number mod
10 is is one um and they are similar for all the other aggregations okay it's
interesting so this in the documentation you write about these as Dimensions
right exactly yeah yeah yeah that's what's yeah called a dimension and and it's
a dimension because it doesn't have an aggregate annotation and so the other
ones are

[30:46] Aggregates right that that say you know take some value from the time
series and take the max Min first last whatever so yeah so these are the
dimensions according to the docks and these are the Aggregates yeah exactly yeah
and you can also yeah oh if you go back yeah sorry I just wanted to point out
one more thing um at the very end um yeah so so you see there's there's for
example a Max field and a total Max field and the difference is that the
Aggregates for the total have a cumulative um true flag and so what happens is
that you every hour when we start a new bucket without the cumulative flag we
start the bucket at zero so the sum for example starts out at zero at the
beginning of the hour but when cumulative is set to true we start the sum at
whatever the sum was in the previous hour um and that way you can do s the
Lifetime aggregations right if you're um interested in I don't know the total
volume ever traded for a token you would make that cumulative um and yeah that
way graph node keeps track of um of the the sum

[32:00] overall time um for yeah for the the trade volume from your time series
okay that was not very clear for me when I was reading the docs but I would say
just try this out it it's just because probably I'm too stupid um but I can do
volume this one okay that's right yeah okay let's try this out and I can yeah
while you do that I I can talk a little bit about why you would want to use
aggregations like the main motivation for them was actually not so much much
indexing as queries um because what happens right

[33:12] now when you manually um do these aggregations right like like what
people usually do in in subgraphs is they have some some entity type in Unis
swap type subgraph it's usually called token or something like that um that uh
keeps track or token our data um that keeps track of these aggregations and so
every time you get a swap for a token you load yeah you have to first figure out
what hour you're in then you load you the token hour data where you have chosen
the ID cleverly to to encode the hour um you load that you add whatever the
trade volume that you just saw in that swap to it and you have to save it and
what happens behind the scenes is that um because you have to update every time
you know some swap for the token happens um you create a lot of data in the
database that that's sort of um not very interesting because once the hour is up
you're only interested in the the value of that entity um at the end of the hour
but you the interesting entities at the end of the hour are mixed in with those
intermediate updates that happen during the hour so when you run a query

[34:25] it has to run against the database table that's much much larger than um
the data you're actually interested in so yeah it's it's typical to have you
know one of those tables have 100 million rows but there's only like you I don't
know 100,000 entries in there that actually represent finalized hours um and
that make that slows down queries a lot and by using aggregations um we we are
smarter about how to manage the data we keep the time series and then once the
hours up we do a roll up we do a query that does the actual aggregating and then
creates a new entry in the aggregation type um and that makes it so that you
know the the table for those aggregations that you're going to query later on
are much much smaller it only contains the data that that you're really
interested in for querying not the intermediate values um and so that they'll
speed up queries for for this stuff a lot and it's also like on the indexing
side it's yeah it's a lot simpler to write you don't have to man manage you know
what's the right ID for this token at this hour um you don't have to manage that
um you can feed many

[35:38] aggregations from the same time series so if you do you you don't need a
separate token hour dat data and token day data um uh entity that you both need
to update when you see a swap um so it it it simplifies the the mapping code and
it'll prob probably help a little bit with indexing speed I I wouldn't hold my
breath that it's going to speed up things tremendously but since you're you know
you're loading fewer entities and you're writing fewer entities uh it should Pro
it should also speed up things a little bit Yeah so basically we can skip those
whole functions right that we have here the that all that is baked in now in in
the graph yeah that whole token day data loads um if yeah yeah nice okay let's
see if that I think if we can like see this um stats so we have now volume and
cumulative we can send it this should

[36:53] actually be yeah yeah so actually that's may be a good a good example
because here we have volume zero it just stayed at that one from from below so
that yeah what I wanted to also know like David if you still here the the
ordering is like newest first right yeah it should be unless there's a bug yeah
okay because I I wasn't able to set it here in in the filter yeah yeah I mean
that that's so so yeah this whole feature I would consider a tech preview um
right there's there's still stuff that might change um and yeah I'd love to hear
from people what you know what needs they have for ordering for example um yeah
whether we we should allow ordering by something else um I mean okay no no real
ver examp but I think like that direction is definitely

[38:06] one but maybe I'm also interested in query like which was the day with
the highest volume last year then I want to filter by or like sort by volume
yeah but yeah these are not real world examples it's just Like I'm made up no no
yeah I mean yeah yeah anybody should feel free to open a feature request in in
the graph note um repo so I'll give you this Al s a link feel free to tell us
here okay um yeah it's very cool stuff so we see the cumulative one uh did I Al
you po yeah you posted the the the example one nice yeah I think this is this is
pretty cool um in my opinion this is one of the biggest features that we shipped

[39:20] recently I would say maybe with file L sources and that could change
fundamentally the way that how how people write some subgraph so very happy to
see this and um hopefully we can tell more people about it any questions from
the other people in the room one thing that I also know already is uh that that
we discuss is right that we say um that the aggregations also get deleted at
some point there is this idea of saying uh yeah actually the hourly data is just
uh interesting for this week but maybe last week we already just want to see the
the the weekly right yeah I mean the the sort of time intervals that that we
right now we just have hour and day um that that's another thing I'd be curious
you know what people need um what granularity um so that that would also be a
good one for for feature request if you need things like week month whatever

[40:41] Co all right you can also have questions other than about aggregations
if you want and we can dive into it po but I hope you enjoy our artist did a
great job and we continue this for the next Builder officeour

---
source: YouTube auto-generated captions
uploaded: 2023-03-20
duration: 1633
---

[00:02] hello hello everybody can you hear me nice okay cool let's get started
so um my name is Simon uh and in this short presentation today I I will walk
through the possibilities of using data on the graph in a data science context
or in a data science approach um yeah so let's just jump into it so like to just
repeat some smart contract Basics I mean like I probably you probably are all
aware but um for the mental set set I would say like a a smart contract by
itself is is basically storage um of data and then you have rules to change that
data but the problem with the storage is that the smart contract if you query it
through Json RPC it mostly knows the current state like the tip of the block
that's the data that you can query so when you look at the crypto punks example
as we see here then it's easy to query and ask like who owns Punk number one but
it's a bit it's hard to know who owns Punk number one before and even harder if
you want to get try

[01:16] to get to the data like how much was the price and how did that price
change over time because that's something that the two smart contract by itself
does not store it's stored on the blockchain through transactions but it's not
easily retrievable and especially for nfts there Comes this idea of provenance
so how can we see who owned the uh an nft before because it's quite important
right so if if we see like with the league once owned an nft then it might be
more free than when I owned it before right um so what the graph or like what
would be cool is to have something like a time machine so we can travel back in
time and look at smart contracts how their state was like a week ago or a year
ago or whatsoever and get that data in and like easily access it um yeah and so
on the blockchain just as a quick repetition it's kind of distort thing um we
have the smart contract as I said and then when we change the state of a smart
contract we send the transaction to the blockchain and these transactions are
stored and that's how we then later on can retrieve that data but the whole
thing is nice and stuff but the blockchain was never like

[02:29] directly invented for the data science approaches that we now see
nowadays kind of popping up everywhere um it isn't it is designed for mainly to
solve this double spending problem you know and that you cannot send one if you
own how if you have one if you cannot send it to different people at the same
time so like all that stuff works very well because also we pay the the
validators to to bring the blocks in with transaction fees there are block
rewards and all that stuff but that is all kind of designed for the data for
actually to read data to write data onto the blockchain but if you want to read
it out um we need to go to this Json RPC interface which is a specification that
comes from around 1997 or something like that that's even pre it's probably a
web one protocol that that most people interact with the blockchain to to get
data out which is a little bit range in my opinion so how it looks on the
blockchain it is we see this we see all these different protocols they all share
this one lecture and all these transactions are just like stacked on top of each
other and if you want to kind of make sense of what's going on in the maker dial

[03:40] protocol then we need to find all these uh green lines here in in this
stack so in order to make sense of like hey how did the dvl actually of make it
out uh develop over time or which are the walls that are um maybe in risk of
liquidation and so on and and that's that's a little bit The Challenge here so
when you start to interact with Json RPC and trying to get that data out by
yourself you end up with code like this um what we see here is like in
JavaScript world um really you know doing hundreds of requests depending on how
many like it's simple it simply just gets like hey I want to see all the nfts
that one address owns right but what we do here is like okay we we get the
contract we we send the query to the contract how many are there and then we
Loop through that and for every for every um token then we send another request
and all these requests that take 200 300 400 milliseconds to resolve and they
are they are sent like uh in um sequential so like it can easily get take up to
10 seconds or something like that to just

[04:52] do this simple query of like how many tokens or which tokens does this
address actually hold and that's mainly limitation of Json RPC because it's not
built for efficient data extraction and that's where the graph comes into play
right this this API for a vibrant decentralized feature and on the hosted
service we currently see one billion queries per day uh so like it's it's very
it's very used by the bigger protocols also um we dive later deeper into it it's
not only that the bigger protocols have their own subcrafts that you can use but
there is also also like very high quality subcrafts especially built for data
science purposes which we will dive into later on top of that the graph is not
just the centralized offering it's not just like a web 2 company that does that
a little bit uh does web3 because it's cool it's actually a decentralized
indexing Network protocol so the idea really here is like that data should be
free and data should be in the hands of us all and not like that somewhere like
a Google that that is able to give you access to their blockchain API and then
and then asks money for it and then you're never really sure if that data

[06:05] that that they provide to you is is right or not it's really a decent
like the goal is really to be a decentralized indexing Network protocol and
that's already possible like on the decentralized graph Network by today we see
more than 800 sub graphs already deployed 435 indexes worldwide like these are
individual entities they are not like that it's a permissionless protocol
everybody can become an indexer um so that gives a huge redundancy that that's
up aircrafts are indexed by multiple indexers and if one goes down and other
states around and that also makes it cheap because indexes compete for the best
service and the whole mission is really going to This Global open API that we
can all work together and query together and the data is here at our fingertips
so that gives us in the end truly decentralized data now there is a lot of data
science stuff around like more and more I would say like we we see that the
space more people see like it's very interesting to get data from the blockchain
and try to do some analysis on it and uh for

[07:18] because also the blockchain by itself is an open open system it's it's
very interesting so we can see Trends we can follow Wales we can start to try to
find out like where are these um uh where are these events happening how can we
identify and then do we see that it triggers something else is there any
correlation um so that's very cool also the data availability is high as I said
because we have this decentralized network there's always one indexer around
it's it's transparent like sub graphs most sub graphs are open source so we can
verify um what they actually do how they are executed and we can also learn how
they are built but there's also the decentralization aspect that I said also in
the graph Network there is a consensus mechanism on data correctness so indexes
talk to each other and um or that's something also that will that will come more
um to see like hey I saw this data what it what data did you see and then then
we we know like okay this is actually we can find the truth and it's using
graphql like graphql in my opinion is one of the nicest data query languages out
there because it's very it's very descriptive you will see later on I I

[08:32] show you how we can we can dive into and very powerful and in the end
you get out Json which is like a a very common format of uh working with data um
yeah so the cool thing also about graphql is because it's an open standard so
you can use whatever tool that you want to to use it uh in the end it's Json so
you can use Python you can use the r you can use Tableau you can use retool or
whatever data science tool that you need in the end you feed in Json um that you
can extract from the graph so as a data scientists um some tips to how to
approach so first it's very important to be aware about what do I want like
what's my question that I want to get answered right I mean it's one thing to
play around a little bit and explore the data but it's always better to start
with a clear question so for example one question would be on on maker Dao
protocol is like hey which are the sub graphs and only charges which are the
walls that are near to liquidation or how does the

[09:44] whole value to um ratio look like uh value to borrow a ratio look like
and if we if we have this we can start we can start to explore the data we can
see which data is there how is it presented can I make sense out of it and then
we can we can perform the analysis get that data actually out start to play
around get it into our tools try to to draw some charts and see if that makes
sense then we can communicate the results results or we can reiterate we can
maybe say like okay that brings me to the idea that we could probably also start
to combine it with data from always if we can like have a more broad view or
some something like that so that's so the general steps that I would like to
follow doing data science with the graph cool so a quick quick repetition so who
in the audience knows what the sub graph is cool all right um who wrote already
a sub graph okay two three all right nice cool nice thanks for using the graph
good choice um yeah so as a quick repetition what is a sub graph

[10:57] but the subgraph is the main building block of a graph of the graph you
can you can think about it's mainly code so you you write code and one part of
the code is a schema so this schema defines a database how a database looks like
so you can start to do something like for nfts for example you do like ah okay I
have a token or an F I have nfts then I have owners I have transfer so maybe I
have sales and then you just start and and give for each of these entities uh
Fields so it's really a database schema first and then second you have a mapping
a mapping is an instruction set of telling then the graph nodes how to extract
that data from the blockchain so you say which contract or I'm interested in
which events on that contract are interested in what should I do if I find if I
see these events and then you start we start to kind of write that code that
gets the data out of the blockchain and stores it into the database so we later
on have it available for quick retrieval so that's that's a subgraph um so to
come to that image from before as I said like on on the blockchain everything is
in these transactions and

[12:09] these different protocols share the same data The Ledger right sub
graphs basically clean that up so with sub graphs we will end up eventually with
like clear defined databases or buckets that only focus on that data that is
interesting for us and um and then we can later on just a query per bucket so
it's really an indexing protocol creates this this thing that we can think of
each of these databases as one subgraph and eventually we end up with a very
nice graphql queries like this so that's doing the same thing that I showed
before but just if graphql and with the graph so it's one query to the
decentralized network that gives me like all the nfts um with previous owners if
I want to with metadata if I want to so that's that's really a beautiful way of
retrieving data so that ends in this modern depth architecture or model data
science or architectures like that we have the user interface or the consumer
part on the top and then uh in the it still writes to the blockchain directly
because that works well right but in between for the data retrieval we have this
indexing

[13:21] protocol which is the graph so we have this quick a possibility to get
to data a graph node looks roughly like this on top um we send transactions to
Smart contracts the smart contracts then emit events the graph node listens to
those events when they see the events it goes to the mapping module on the
bottom left um and that that stores it in the database and then it's stored and
then on the also on the left side we see the queries go through the graphql apis
and then just into the graph node it retrieves it from the store and sends it
back that's roughly how this works or you can think of it like this nice little
chip here so we have like this just mess of of data and like magically the graph
helps to organize it into these pockets so if you want you can tweet about that
you have learned about the graph so marketing told me I should have a slide like
this to increase Twitter engagements I will probably retweet or like um so it's
not just like it's a you know it's always you can take Network

[14:33] building and stuff um yeah okay thank you so much for the tweets I
appreciate that um so yeah let's just do it right so another QR code if you want
to quickly go to that one that links actually to the slides of this talk um so
you could follow that along maybe later or now or however it um yeah it's
comfortable for you um because like later there is like a lot of links that make
make sense to to do the first steps do we all have QR code scanned okay cool so
I said before like on sub graphs um it's it's a decentralized network and and
like everybody can publish a sub graph there and so on so not all have the same
quality um also like a lot of subgraphs are built by the DAP teams basically to
power their front end but if you really have this data science uh use case or
requirements then another structure

[15:49] would be needed um and that that's where the Missouri subgraphs come
into play actually they so messari joined the graph as a core Dev team I think
last year they got some funding from the graph Foundation to really build these
high quality sub graphs and um their goal is to eventually write 400 sub graphs
as of now we have like 90 subcrafts are production ready and the cool thing
about it is that their sub graphs are all schema compatible what does it mean
when you can let's let's have a look at them actually so you can go to the
subcrafts.missari.io and uh we see this yeah and then we can scroll through it
so they have categories so there's a bridge there are bridges so we have Bridge
sub graphs that are tracking all these different Bridge protocols although most
of them are still in developments you see that here but um for example this
multi-chain bridge if you go on the ethereum sub graph and open it up and uh

[17:08] open ethereum then let's open Phantom so you can click on on here and
then you click on that um header and that opens then the actual subgraph now if
you look at at the sub graph um in in detail in the playground uh what I do is
usually I just go to this graphic URL in Explorer here so that it's really
helpful with that I can actually really start to explore the data so let's see
so we see we have accounts Rich message cross-chain tokens and so on so forth
and when I go to this one because it is from the same category it has a it has
the same like accounts Rich messaging tokens um and that's very cool so I can
start to do to craft the query let's say I know cross-chain tokens and send it
to one subgraph so it's the multi-chain ethereum

[18:19] I can just copy go over here paste and send it again and the same query
works now this thing with the standardized schema it's very powerful because we
not only have Bridges we also have exchanges so you can start so we can start to
write queries against let's say I know honey swap and then take this exact same
query and and send it to Trader Joe on Avalanche and so we can start to compare
them right so we can see for example we can compare daily volume or which tokens
are the most traded or how many um what's the tvl and so on so forth and we can
just one craft the query and then just send it to every subgraph in the same
category so interesting categories are probably exchanges you see also here they
are already like a lot of them are already green and in production um then we
have ESC 721 all the dates still in in the works we have governance so for all
the people

[19:33] that are interested in Dao's like there is a real you can we can really
extract Goods good stuff from from the governance um uh yeah governance across
all these different protocols the Downs how the votings are the ballots we can
start to look into this um there are lending protocols so again here is our way
maker compound and and so on this can also start to compare compare the key key
metrics there different networks nft marketplaces is on the way um yeah vaults
Etc so that's very a good a good thing to start here cool that's what we showed
yeah if you want to query a subgraph on the decentralized network we can go to
the graph.com we have also the graph Explorer so the one is this messari thing
also it's just the graph Explorer for example like I know there is this crypto
Punk subgraph here it is and again we have the playground the playground is we
can just play around right again here we can open

[20:47] the Explorer so let's say let's look at um the highest sales right first
10 order by bound or by Direction descending so you really see thanks to the um
the graphql interface we can really start to just explore these different
schemas and by just clicking around and let's see amount timestamp a transaction
hash so who of you knows which was the highest Punk sale ever happened or how
much how much if was it nobody okay now we can send it like knowledgeable people
would probably say it's this one I think it's 800 eth but there is actually one
that was even more I think the 1200e for something like that why and but if you
go to larvalabs.com website and then we see like the highest one was

[22:01] actually this one 8K why is this not this one not stored we can also get
maybe the ID um no let's see nft ID we need okay so 9998 was the highest sale
but five eight two two is that what you see here on larva labs so you know again
larvalife's website is a centralized website and what they did actually is they
sense or the highest transaction why because this person that made that made
that one use the flash loan from Ave to just buy its own Punk and send it back
in though in the same transaction um in order to game game this uh this ranking
right and then larvalev thought like yeah I mean like that's that's not really
the highest sale right I mean this is cheating but now the question is is it
really cheating if we really look on the blockchain this was actually the
highest sale so now we have like a very good example how to trust data or when
to trust data right cool I think we are almost at time I'll show this QR code
again but we also have like maybe one or two minutes for

[23:16] questions so um if you have a question please raise your hand and then I
try to understand you uh hi grabql has a kind of event notification back to uh
back to UI let's say does a graph support that that kind of thing yeah that's a
good question um so there's there's the graphql subscription standard that you
talk about um it was implemented in the graph node so it's kind of there um but
uh it's it's deprecated we do not officially say you should use it because you
can run into weird problems with it um that being said there is a new standard
coming to graphql which is live queries which is actually a little bit nicer
because you then would just write the query I mean it would look something like
this you just do the I think it would do something like this at life that
doesn't work here but you would just annotate the query as live and then like
whenever the underlying data

[24:27] changes it would be pushed that's something it's currently worked on but
for now um yeah you you can we should use polling for now or you can try this
old subscription standard yeah more questions yes so who pays for the queries
and what are the tokenomics of you know the tokens that you need for that yeah
sorry good question also so that basically you pay per query um and in order to
do that you would need to have an API key the API key you can simply get uh on
the when you go to the SuperCraft Studio you connect your wallet I make it a
little bit quick um and then you can just go to API Keys create API key and then
you give in your email and then you receive thousand free queries and later on
uh how it works you need to load trt on arbit room although you could directly
Bridge it on on ethereum

[25:39] to to load your um your API key so the idea is that so indexes went a
little bit into tokenomics so indexers receive indexing rewards but also query
fees um in order to serve these queries but it's subject to change maybe at some
point there will be more query fees and less indexing rewards so we're really
bootstrapping the network right now um it's very early but for you as a data
scientist they want to extract data go to the graph to concept Studio log in and
get thousand free queries and then you can already get started and with that
participating actually the graph is sponsoring the hackathon on the weekend and
if you use the decentralized network and um for your data science stuff you will
get the points for that cool I think that's it I go back to this one again as a
last time so you can check it otherwise I will stick around maybe one five or
ten minutes here but you also find me later I will be here like a different
events always open for a chat and thank you so much for your attention thank you

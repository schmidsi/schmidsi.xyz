---
source: YouTube auto-generated captions
uploaded: 2023-11-06
duration: 1342
---

[00:01] hello hi everybody my name is Simon I work um as a developer relations
manager for et node and I work on the graph protocol and uh yeah today uh a
little bit talk about the the rough ideas of how we can bring web two data into
web 3 uh obviously with the graph um yeah let's jump into it um so web two data
what is this I mean it's like a big term and um but I have some use cases in my
mind that that I'd like to discuss here so um I spent some time on cat GPT to
find some not chat GP that was me Journey uh getting a little bit addicted to it
for for my presentations but um to have some use case that we can describe here
so one classical web 2 data use case is uh airplane seats free airplane seats
like there's a whole thing about uh airplanes and seats and which are free and
which aren't and so on so for on it's a big industry also going on with kind of
of that data brokerage um but that's actually interesting web web two data that
we might want to bring into web 3 but the question is how same and very similar
uh kind of data sets are uh free hotel rooms um especially maybe the ones

[01:14] that are uh short-term free um is again like we have data sets of of of
of hotel rooms that are free that that hotels would like to kind of uh give away
so that people can book it um but again like very complicated Data Systems
currently um I also like uh one use case that's interesting that we see on the
bottom right is um actually uh server data or like uh traffic data um that's a
use case that uh that is actually already explored I go into this deeper but
like there's this idea that all these servers they all collect data all the time
like access data when someone access what is the how quick was the response of
the access um which website was accessed and so on so forth like also very
interesting data that can be used or Al Al published and last but not least the
idea of um and that's a weather station I don't know if that's that's clear kind
of the the idea of having weather stations that publish data like publicly
somewhere and that then we can then kind of get that data from the weather
stations back somehow into web 3 so that's stuff that we explore all all these
kind of use cases have in common like there is a lot of data it comes from a
trusted centralized Source but like the usage of the data uh

[02:27] could be very interesting so so don't necessarily need like a trustless
you know the P pure system of like oh we really have which which the blockchain
by itself represent it's kind of good enough like so if an airline says these
are the seeds that are free in my plane like we don't need another Oracle that
kind of um uh says that data is true because the airline says we can trust it to
a certain degree um but anyways and and also like the data is useful and
something that we we might not want to protect because like the airline is very
is very interested to get rid of the get rid of the empty seats they don't
necessarily need to have like an access control of who can see which seats are
empty or not at least a subset of seeds um are there same with uh with with
server data uh some amount of that that one we might want to give sure like we
don't want to publish all the IP addresses and stuff that query our Ser but like
some stuff we might want to open and um the problem is open often with that data
is that that the data is there it might be useful for other people but it's not
directly useful for the business that collects that data directly so they don't
publish it and so in the next couple of slides start to

[03:40] kind of develop this idea of how can the graph help to publish that kind
of data or make it more easily accessible nice let's jump into it so what is the
graph I don't know who knows what the graph is please raise your hands okay so
we can make anyways a quick Refresher um yeah so uh that could be an animated GI
that all that takes this mess of all this different uh balls which represents
transaction on ethereum into buckets of um ordered data so kind of the graph is
this infrastructure protocol that sits in between initially built for for front
ends that um that need to display data from the blockchain and the and the the
the graph if the subgraph they sit in between so like they they make it easier
for front ends but also like data science applications to access data from chain
because like we know the E theum blockchain archive no is 3 terabyte compressed
so that's not that's not the easy easy data to quickly go through so the graph
sits in between has kind of this indexing and query layer of blockchain data um
so we talk about like the data layer of A3 um

[04:54] but also the graph is a decentralized network I think that's the most
important thing like there are 2 81 indexers these numbers are actually changing
all the time uh the index is coming and sometime they go but like it's roughly
200 but mostly growing right uh 281 indexes we have like uh 11,000 or more
delegators more than 2 and a half th000 cators and uh more than 1100 um
subgraphs on the decentralized network um so that's a cool thing so we have a
decentralized Data Network that can uh that that everything works for data um
for data collection and also data distribution and as of now we are I think that
even now that this number went up to 3 million trt in query fees since the
decentralized network launched so it's it's kind of of going on kind of that's a
decentralized Data Network so we have truly decentralized data or that's the
goal um so and the graph consists of this simple entity called the subgraphs and
we can also think about subgraphs in a way like we can put on these lens as uh
read oriented rollups so it's a little bit a a big term read oriented rollups
but like we can think about okay so how how does data flow through these
subgraphs so a

[06:08] subgraph consists of a subgraph also always is kind of attached to the
blockchain um or at least initially and then it it listens to events on the
blockchain or uh also it can also have call handles block handlers but basically
looks at data on the blockchain and according to what's going on on the
blockchain it decides to store some stuff in a datab base um and the the
language that we use to to facilitate this is either assembly script or now rust
with substreams and the mappings that decide what data we want to store into
into the store can also read from that database so that simple data flow of like
data comes from the blockchain will go through the mapping will be stored and
then in the end will be queried um by consumers that's basically the the data
flow in subgraphs the cool thing about assembly script and rust is like both
languages are touring complete languages similar to solidity which is also
touring complete which translates into basically you can do whatever you want
with it uh so like a t a touring complete language can for example like download
a file or an image and compress that image and store it into the database or a
tour in complete language can generate audio if you want uh there is actually
some

[07:21] projects that do that generate audio with a subgraph or you can I don't
know uh calculate some ck proof over data that that that was seen or something
like that so so it's a really powerful thing to have a t in complete language
and also uh the whole thing actually I think two years ago um kind of come come
on in this idea like so we have a touring complet assembly script so maybe we
can build something on top that kind of uses that as then it's by itself is
being a blockchain so uh that this project actually developed into a almost kind
of a social social network that that only uh had very small anchoring onchain
and then built on top but I explain a little bit more how that worked um oops I
need to go here so basically what happened is like that the subcraft can also
download data from ipfs and RV um so that they come up with this idea of we can
simply have a data Edge contract which is as simple as that like only a fallback
function and whatever we sent to that fallback function the smart by itself does
nothing but the cool thing is the data is stored on chain so

[08:33] either we can start to send some data on chain and have a subgraph then
that ingests this and transforms it directly or we can also send data on chain
that links to data on ipfs or now recently shaped RV so the subcraft downloads
this and draw something out of it right so that's the rough concept um so what
happens is like or according to this example that the the logic moves from the
blockchain to the subgraph and I kind of hinted it already uh the graph is or
subgraphs or graph nodes are are able to download data from ipfs on RV and this
is this is where this starts to get uh interesting so um so the so primarily the
the the graph subgraph looks still at the blockchain but you can then see uh
hashes from RV for ipfs and then downloads that data that could be like huge uh
Chason files which which can be loaded and then analyzed inside of the subgraph
and stored into the store um so that was actually uh tried out by one of the
data scientists at etan Noe um his name is Craig and so there are in the graph
Network there are multiple

[09:46] gateways that facilitate um that clients can query uh in into the graph
like this this is a very common setup that we have gateways to a decentralized
network that also applies to the graph but what's important is that that data
that's collected on these gateways um it's very important because it's it
basically says like which subgraph receives how many queries which indexes serve
that query how quick were were those indexes able to respond to that query how
much uh uh how much um money per query did this indexer um get for that query
and so on so forth and and and if if you have thousands or hundred thousands or
billions of queries um that really gets into very interesting data that just on
the gateways but like since it's a decentralized network that data needs to be
accessible publicly like everybody should have access to that data although it's
traditional web 2 Data because it's kind of collected on a server so they so
they came up with this idea of like it's a little bit a complex um thing but
what basically happens is like the gateways take that data the traffic data that
they have and upload it to ipfs taking that ipfs hash only just send that ipfs
back hash back on chain and then there

[10:59] is a subgraph that in that downloads that that traffic data from the
gateways from ipfs and starts to generate the subgraph that gives us great
insights about like which index which quality of service which subgraphs are
queried the most and so on and so forth very a cool system and that same system
can apply could be applied by let's say U yeah airline company that wants to
kind of get rid of of the last seats why not just uploading uh lists of seat for
flights like uh on onto ipfs anchor it down onchain and then having it um
distributed by by a subgraph or the graph another um another possibility would
be um uh think about weather Insurance onchain weather Insurance uh dive a
little bit deeper into how how this works but basically uh let's think we could
have a a network of small weather station independently operated weather
stations that people just run on their or have on their on their houses that
collect data about like how much wind do we have and how much rain or something
like that um and since they are independent we can kind of trust but now all
these weather stations would then upload like every 15 minutes maybe ad Jason to
ipfs or RV but anchor it down

[12:15] on chain and then we have a subgraph that would then collect all and
aggregate all that data because they also have like um the the coordinates of
the different independent better stations um and that could unlock very
interesting use cases and the cool thing here is like when it comes to data
publishing and also giving access to the data we can't rely on the decentralized
craft Network that's already existing so when we have these data sets and these
subgraphs as described we can just publish them to the graph Network and then
they are automatically indexed by the indexers and we don't even need to uh
think about access control um rate limits and so on so forth because the graph
Network by itself already has that has that baked in that um when someone wants
to query the graph Network they need need to uh get an API key or whatever the
Gateway is offering for Access and then to to access that data and so that's
given because a lot of times that data is not published because it's such a
headache to to publish data as I say like if if I would be the CTO of such a web
two company and have interesting data and that someone might find interesting
they think about okay what do I do I open my server so that could be an attack
Vector maybe I I have too many requests so I need to work on rate limiting or
maybe I need to want to

[13:29] charge something because the service not for free and so on so forth if
the graph that's all kind of solve just need to upload to ipfs and leverage the
graph Network um yeah now it even got got got easier like to query the graph
like there's a new um billing subscription Billings on online that um that we
can pay with um usdc on a monthly basis for a fixed amount of queries more
Innovation here is coming so that's really something now talking to talking
about that um weather Oracle example from before uh now when we have a subcraft
that aggregated weather data it could be actually used for uh onchain Insurance
smart contract because if if there is some trust in into that data we kind of
know did it rain in Berlin or not right and then that could then trigger the the
insurance is it paid for that Festival that should have happened or not um
because now we have the data in graph and we can bring it back on chain like
there is the the chain link functions that are just I think uh two month some
months ago first launched but also the gelato web 3 functions uh which are
around for a while that can both interest data from

[14:42] the graph there are um and then put it back on chain so that's very cool
so we can have like offchain data coming to the graph and then being in the sub
graph being um processed there and then finally put back on chain um so that
kind of fills up with with this uh idea of the read oriented rollups so when we
see rollups they just have like there will be State coming up from the main
chain and will be written down to the uh to the L2 and going back to the L1 and
with read oriented rollups um yeah we see like the the data comes up or maybe
even from from other in uh will be quicker to access but also can be then uh
rolled back on chain with uh with Nole so this is the idea here um there's one
word to be talked about about verifiability when I when someone runs an oracle
how do we know what how can we trust the trust the data so there are different
levels of verifiability of data on the graph Network as of now and in the future
so as of now all indexes submit like in a in a repeating period the so-called
proof of indexing so what they do is basically they say I saw this and that

[15:55] data and I prove or like I I signed that with my private key and I put
it back on chain like a hash of of the data that I saw so indexes can compare
with each other did we all see the same data um that's for one and then when
someone sends a query to the graph network uh the indexer that responds to that
query also sends in an indexer at the station and then they say I as indexer
blah um this is the response to that query but I also say it's true now it could
be that the index for whatever reason send a malicious or like a wrong result uh
either malicious or like um because they don't know how to run their server
properly but if they do this and with the indexation quation they can be slashed
so this is actually data that can then influence the probability of or the
verifiability of the data that can be put back on chain so an oracle can take
the qu station and put it also back on CH that later on when someone can prove
the index are wrong they can be slashed and then now we know know um index of
stake and then the more index of stake the more they are incentivized to
actually give the correct answer if that

[17:08] makes sense um yeah but that's not bullet proof right so there is also
like a whole core development team working on the graph semiotic AI but also
people from ET node that working on this idea of verifiable indexing and
verifiable quering um with direct proofs of of when receiving the index ration
although these are hard problems to solve I'm not an expert in this this
mathematics but um yeah that's actively worked on and um we'll get better so um
that was it thank you so much for your time you can scan that uh cure code
that's my Twitter DMS are open if you have any questions I can also send you the
slides if you want but I think we also have time for question questions
absolutely so who would like to ask some questions first hi um I'm a data
architect that focuses on bias do you think the verifiability could help
basically elaborate or explore like the epistemological origins of data bias

[18:21] and algorithmic bias is that something you guys have been looking at
data bias yes what kind of data bias so for example gender or racial bias so at
the point of indexing there was a bias inherent due to sort of cultural context
or historical context is that something you guys have been exploring that use
case uh no but that could be that could be part of the subgraph actually because
the subc is the one is kind of the the entry point into into the data into the
system so like whoever writes that subgraph could could start to to have some
algorithms looking for these biases because also you can write the subph with
assembly script which is to complete and could we could load something into this
okay but it's I mean this is very like it's not very uh very use that concept
now that's try to present and hopefully Inspire some people to to play around
with this and sorry second question um I have a lot of clients that their
onboarding issue into web 3 is the fact they can't compute and analyze web two
data sort of like with web 3 so say like they have Smart contracts or nfts and
then especially hotels actually I work with a lot is on analytics layer is there
a tool that you've been using that can kind of visualize both web two and web 3
data

[19:33] together yes so uh the subgraphs in the end are um accessible with uh
graphql the data from from the from from the graph so whatever like if if it's
Web Two web if it's web 3 data which is the graph very well known for like for
most protocols there are subgraphs look at the ones from Missi they have very
high quality subgraphs uh that can be used but also when we follow that flow
here to bring in web two data into web 3 in the end it will be credible with
graphql there's also um currently one research uh path going on of um to explore
how if the graph Network can um give SQL access to that data because in the end
it lives in a database that would for data scientists little bit be more handy
but there's also a tool that that helps with with python to access data from the
graph Network it's called playgrounds um so yeah you can scan my QR code and
they ask me this question I send you all the links awesome thank you any other
questions uh one of my favorite things

[20:45] is a saying that the event logs are the cheapest storage in ethereum um
with verifiable indexing um is this just as strong as uploading state to
ethereum like like if I had a choice between a verifiable index I just for
example just create a smart contract and all it does is emit an event and that
event is captured uh by the graph and then we have a verifiable index that runs
some sort of logic like if in your estimation is that just as strong as having
State on ethereum yeah if yeah if you if it if you think it's true right um
theoretically if you think it true you have an indexer uh we have verifiable
Computing that the data is received we have we have a hash of that data so it's
kind of like true then and then you send the query and and the query is also
verified and and like end to end the whole thing is verified then theoretically
it has the same uh security assumption but that being said like for what I know
we are kind of far away from it as of now but that's the goal yeah that would
even kind of lead into this

[21:57] idea that that there might be the idea that a smart contract can
directly query the graph because it's so verified but that's kind of dreamy
dream far away future we still have a little bit of time if someone has more
questions in that case thank you once more Simone thank you so much for having
me

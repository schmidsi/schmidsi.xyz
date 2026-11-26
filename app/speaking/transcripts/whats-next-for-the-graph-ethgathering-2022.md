---
source: YouTube auto-generated captions
uploaded: 2023-01-31
duration: 1547
---

[00:05] I work for Action node that's a one of the core Dev teams behind uh
working on the graph protocol there are little people know that there are many
more core Dev teams which I will introduce in that talk and also um what they're
actually doing because uh the question is like who of you knows the graph please
raise your hands okay cool that's good then um who wrote already a subgraph nice
okay who wrote A substream okay who deployed their sub graph to the
decentralized graph Network cool all right so I see there is uh some stuff that
we can go into it today how's it going with the slides almost there um nice cool
so we already had a little bit at the start so um yeah I would say like we can
quickly do this is the graph today because I see most people know

[01:18] um so basically you can think about the graph as this right so you have
this um weird chaos of transactions on the blockchain and then through the magic
I don't know how this really works it ends up being nicely sorted and you can
quickly query it right um so it all starts with this idea of we have a front-end
fully decentralized right so the front end is deployed in ipfs interacts
directly with the blockchain preferably on your own computer yeah but there's a
problem with this architecture meaning like the blockchain is made and
incentivized for data writing so you pay miners but um not really for reading if
you want to read data from the blockchain you go to this weird protocol which
called Json RPC which was never kind of designed for really powering front-ends
or data analyst analytics and stuff like that so the solution to this problem is
basically you put in a data layer inside of it or between it that cares all of
the data that indexes the data for you it provides you a query access to that
data so you can have like front-ends data science stuff on top and everything
and don't need to mess around with the

[02:30] with this Json RPC protocol so that um as I said so that makes the graph
so to say on a technical level the day dollar euro feb3 sits in between um the
cool thing is also that it can index different data sources so not only ethereum
but also RV near ipfs data other evm chains cost most and more to come so that's
um it's very interesting when we look again at this one that you can think of
you have one unified data layer that communicates with like every protocol that
is interesting for your depth or your or your protocol and then have like one
unified simplified data layer on top that gives you access so it's more or less
how it should look like so for the coders in here so this would be the
JavaScript code of getting tokens for one user which is super super slow if you
run this and the user has like 10 or 20 tokens then you end up with like one two
three seconds loading time just to display a simple token balance um it would be
much better we have like a really nice graphical interface like here you know
like very nice very tidy cleaned up this is what the graph does because it
leverages graphql cool

[03:43] so um more than a year ago the the decentrals network was launched and
since then it was possible to to publish uh subgraphs to decentralized network
as yesterday these numbers might have changed we have 225 independent indexes on
that Network we have 10 more than 10 000 delegators who are giving delegate
their talk trts to the indexes to secure the network we have 2519 curators which
pick the best subgraphs in the network to signal to the indexes which to index
and we have like 573 subcrafts published to the sun Plus network I mean that's
quite a lot that's very good um so that's the current state of the network um
currently only ethiomanet is available on the decentralized network but more
chance to come right so that brings us to This truly decentralized steps because
you now can actually decentralize also your data layer while in while publishing
watching your subgraph to the decentralized network and yeah we already have
some very very brave pioneers of decentralization um so yearn for example or UMO
who which

[04:59] is here they already published their subgraphs to decentralized network
so thank you so much and these are the Pioneers maybe a quick Applause for them
this is still ongoing so if you have a sub graph on on ethereal mainnet that you
want to publish to decentralized network find me or Kyle and we can actually do
it right on the spot that that could be fun yeah so now we see what was the
graph is currently right we have the decentralized network we have the subgraph
technology which is heavily used kind of an industry standard but like there are
a lot of problems admittedly so subcraft indexing for example is very slow if
you have a bigger subcraft it's super slow um there is also the problem with
like oh we only have one train on the decentralized network we want to have more
chains or it's very hard to find high quality subcrafts because high quality
subcrafts are subgraphs are usually written by their teams to power their own
front-end but if you have a data science approach and you want to have like an
overview over different protocols and data then it's very hard to find good
subcrafts then there are cryptographic problems in when I get when I send a
query to the decentralized network how do I know that the response is actually
correct there are 10 payment problems that say like how do the

[06:12] indexes actually get paid when they serve for queries because they say
they serve a lot of queries currently on the hosted service we have one billion
queries per day and which are served by the hosted service we want to
decentralize all these queries to the decentralized network every query comes
with a payment with a price so how can you cryptographically secure such State
channels these are questions that we um explored together last week so we had
like r d offsite all the graph code apps came together and I will show you some
of the highlights of that week so we have um these are the working groups kinda
Point yeah so here we have the data apis um that that goes again goes in the
direction like how how do we have the data how do we index the data and how do
we publish that data or expose it to Consumers then we have the indexer
experience that goes around like tooling for indexers how can indexes be quickly
on board into the decentralized network how can they set the right prices for
the queries so that is that is fair but they still have like a profitable
business then the whole protocol and network operations the game theory behind
it like how does signaling work how does how many need to do staking also um one
of the outcomes here is uh

[07:27] we migrated whole protocol or like the main parts of the protocol to
arbit room to save up to 50 50 types of gas costs when you interact with the
network so this is good is this coming then we have the snark Force it's
probably more than just snark it's it's the cryptographic security researchers
is a group across core devs that really go deep into these topics that I tried
to outline before and um yeah the protocol economics thought all right so um
these are the highlights um so Network multi-chain support as I say like we
currently have only ECU mainnet on the decentralized network so like more
networks to come announce this gnosis chain as the next next Network so if you
have a subgrapher noises chain and you want to be on the first to migrate also
reach out I'm here then we have fire hose and substreams which is the next topic
these are the the big new improvements that came from streaming fast how to
extract and process data from the blockchain like much more efficiently they saw
increase of indexing speed of 100x this is very cool they will go in that detail
then there is the graph client um by um

[08:38] by The Guild which then which helps in the front tend to build stuff
together to to to stitch those subcrafts together to get more data and reach the
data make data streaming available and very cool stuff then there's the index
launch pad as I said it's a kubernetes thing that you can easily quick run run
up and then launch and launch a very high scalable indexes across multiple
machines then there are the missaris upgraphs which are standardized subgraphs
across all the all the protocols and all the chains which we will look at them
then scalar payments which go into the direction of how can how can the payment
flows to the indexes be more efficient and uh in in terms of one participant
goes down then it's still possible to uh withdraw these thousands or millions of
of simple receipts then Auto Agora which stands for like price finding um
mechanism with AI so that each indexer can get into account how much um
infrastructure costs they have and how much they need per query to serve that
query efficiently to the user and then in the end like one of the biggest topics
but that's a little bit far out are verifiable queries so you have a
cryptographic proof and you receive a response from an indexer that you know

[09:51] it's right because the data that's indexed is deterministic because it
comes from from chain so it's theoretically possible to prove it but it's um
yeah I mean the math behind it's a little bit above my my brain size and all
this is facilitated by these six core devs that we have like at the node that's
the company that I work for which works on the graph node and the the protocol
mainly then we have streaming fast which really focused on this streaming data
streaming approaches for getting data out of the blockchain then we have graph
Ops which help with with the with the index Launch Pad but also also some
cryptographic research they do semiotic AI also very into cryptography and and
um what is the other machine learning artificial intelligence how can we apply
this on the decentralized network then we have the guild these are front-end
Wizards that are like Very Best in Class graphql developer and um they're
building the best tool to actually then consume that data and um last but not
least mesari which doubled down their whole data science team of using subcraft
writing subgraphs um and then really give give tools especially for python
python people to

[11:05] visualize that data so very cool so let's start we have these three
pillars of success for networks it's quality of service cost of service next
developer experience let's start with substream so substreams might be the most
interesting technology when it comes about data extraction from the blockchain
so a subgraph you can quickly I I copied these slides from Alex this is the CTO
of streaming first here to talk at Defcon you can also watch it online if you
want to go a little bit deeper but I give you just a quick overview so it so you
can see as sub graphs basically as a ETL Q pipeline so X extract transform load
and query data so we have this Json RPC polling the webassembly or the assembly
script mapping detects the data stores into a postgres database and then opens
up through graphql so these are subclass there are industry standard they're
good but they have have problems especially in um in this loading in this
loading and storing phase so what what substreams do like it's a completely
different new

[12:17] approach Resort the whole process so first is the fire hose so the fire
hose extracts data from the blockchain directly not through a Json RPC interface
but by flat files just write everything down the cool thing about flat files is
that you can parallelize the thing and really and really stream it out right so
you can have this file output stream that that you send across multiple servers
across different data sources and that makes it much faster to index and
parallelize and so we have this stream of raw block data that you can really go
into anything that's in there and then you have substreams substreams compute
consume that stream and start to work on that stream in a in a mapreduce fashion
so you can filter and refine that stream of data into so that you in the end you
only have to stream that you're really interested in let's say you want to write
a sub streams for nft transfers then you would filter for only the nft um
transfer event signatures and then only take those and then when you see one
then you add just this one thing that you want to do in your store um and then
the cool thing here is it's

[13:28] it's highly parallelizable right that's the word um so these are the two
main things you can also go a little bit into substance so that would be how it
looks like so it's all written in Rust so who's a rust engineer here ah the
technology Choice um yeah I mean I would say everybody needs to learn rastra is
the best language um yeah so how does it work we could then we have the block
and the block can be filtered for for these pairs and pools and then for the
prices and then in in the end aggregated again in like one aggregated pricing
stream across all these amms that could even then be extended so the cool thing
about substreams it did you write modules you write very small modules that you
can then plug and play with each other so you could also then bring in the open
C sales which then ends up with you can end up with a USD per per collection um
that gives this parallel execution of the store I see I'm a little bit my time
is short so so much to do here so we have on-chain data from asari so they had
this problem that they looked

[14:40] at all these different um protocols and wanted to um wanted to compare
they looked at the industry and they saw like you know different data sources
and then like you sometimes you have like double data sources which are maybe
even like contradicting or you have like even some some is missing because you
know everything was there so they went out to create this uh standardized sub
graphs across all these protocols which are all going having the same um
attributes and schema in there so and they make these categories I think one is
lending then you have amms then you have others who have I think five categories
and then across all chains they've always wrote the same schemas you can simply
compare all these protocols to each other um I think it's more than 200
topographs high quality subcrafts that they've wrote um you can do you can check
them on subcrafts.xyz and then also they create these data apps which then
consume that that data and you can visualize it and they create uh they are
working and soon release a python library that helps you to build streamlit
websites which they call data apps that consume that data

[15:52] and display that data um to the users so that's a very powerful thing
that that also their data scientists which are into python can start to write
these data apps and publish it to the worlds that's very cool also um yeah so I
see some examples um also there is the protocol metrics UI that you can already
go to on the Messiah page it's public the data apps are currently private better
but there will be open source um yeah that looks something like this so for all
these protocols you can explore the protocols and then you can see the charts
and to new you see what was going on um and this is also powered by the missari
subgraph so very cool stuff like very easy to engage with with technology from
the graph before you need to be able to write sub graphs or write know how to
consume subcrafts in graphql but now you can use the graph basically by using
the sub crossover sorry so this is very cool then we have the next big thing is
the graph client who is a front-end engineer in the room or like full stack also
from then yeah most people in web3 you know are like into contracts and Game
Theory but

[17:05] if you wanna if you want to get the rest on board we need to have like
great ux with great front-end so um that's what the graph client helps here so
querying data from the graph from the front end I mean yeah you can do it it's
okay it's it's a graphql interface but what's there are a lot of features
missing or hard to implement that you are usually um that you expect if your
experienced with graphql in web 2. so so the end the what the graph client does
for you is like regardless how many data sources that you consume regardless how
many different subgraphs or even if you have some web tool um data source that
you want to bring into your front end or you have some that direct access to the
Json RPC you can use the graph client that brings this all together into one
uniform single graphical schema inclusive mutations actually that you can load
into your in the browser so it's like a server that runs in the browser so you
can still have fully decentralized apps but um kind of build upon this this
experience of having like one unified schema that is usually the case when you
write front-end tabs so quickly what is what are the future

[18:19] features so like they have end-to-end type queries so they can Auto
generate um SDK functions for you out of the queries exposed by your sub graph
then you have live queries that means like it helps you that you can write the
front and then whenever the underlying data changes on the blockchain your front
end automatically um updates then you have automated block tracking which goes a
little bit to the live queries that the front end is aware about the current
block and according to that can send a query if needed back to the to the sub
graph without actually interrupting that much the rest of the computation then
you could um query multiple subgraphs at once right like a lot of protocols
nowadays they have the same subcraft deployed to different chains and that makes
it in the front and sometimes quite challenging to bring that back together and
and know what's going on so like the graph client can just say like okay these
are my sub graphs and then it builds you automatically a unified um yeah one
scheme on top of it then we have automated pagination um which helps you when
you want to query data from the graph it's usually a little bit hard to go to
through all these data sets because it's big data

[19:30] sets and you cannot just download you know terabytes of data from it so
that the graph client also helps with that for the python world it's the
Missouri stuff that helps with pagination so we have like now Python and
JavaScript very well covered um yeah and the future of the graph client actually
uh didn't skip get this in but the future of the graph client is even better uh
query mechanisms where you can say like I load the I load data that's quick load
and then later on reload the data that is a bit slower so you can have Snappy
interfaces with several steps data loading and that kind of fancy stuff so
that's very cool so if you're into front then definitely check that out I'm also
here today and tomorrow and happy to you know dive deep into your front-end
stack that's where I come from um that's my might be so I'm so excited about
this because my path into web3 was through front end so putting it all together
again I think uh summary the multi-chain network viral substreams like really
extracting that data then the graph client how to consume the data graph cost is
something we didn't talk about right that's from uh graph Ops it's the idea that
indexes should also exchange

[20:45] data with each other they should exchange data about which blocks did
they see about what was the data and maybe if there are difference they can
negotiate already like why did you see different data than I have index
Launchpad we talked about the Missouri subgraphs the scalar payments yeah these
are like the highlights so in the end all the stuff gets harder better faster
and stronger but like we have the better trust guarantees better developer
experience better query processing and better uptime guarantees which um yeah
makes the graph the data layer thank you so much oh can you can you leave the QR
code for a second so people might want to follow me on Twitter or to send a DM
and I think we have time for questions actually is Andrew yes is there a
different clients uh like on on ethereum you have different clients that you can
run uh do you have the same

[21:58] at the graph just for the yeah yeah if you want to read query from the
data from the graph you do not really care actually which chain is indexed below
because it's just graphql the thing when you when you when we look at the
extraction um the graph node as in current implementation it usually
communicates with Json RPC so like every Every evm Chain compared to every evm
compatible chain is compatible so to say and but the sub streams is a little bit
or fire hose it's a bit more complex because you would need to patch the
underlying graph node to actually bring that data out in in in that stream um I
can't recall from my hair like it's definitely done for polygon ethereum I think
also Solana and um others yeah okay thank you I what's the future for hosted
services with the graph Network coming about so for chains not not ethereum
chains will there be a opportunity for a smooth transition very good question I
should actually include the slide for this thanks for asking um so the hosted
service will degrade over time but only as soon as the

[23:11] network is actually good and stable enough um so far we had there are
like especially with the billing process it's quite cumbersome you need to you
need to uh Bridge it to polygon and load it into a contract there um so we're
working on improving this and as soon as we are confident the community is
confident that we can now do the step together then we'll slowly and surely
deprecate chains on the hosted Service as soon as they are really ready and
production ready on the decentralized network thank you hey um I like one
question because one of the thing that you mentioned with the new graphql client
is the fact that you could query multiple sub graphs and this is generally one
of the biggest pain point of having schema stitching or Federation what are your
plans on solving this um I can show you how it goes yeah you can go in the graph
client you just Define which schemas you want and if they are the same they it
really helps you to sketch it together automatically um yeah the graph client
like you should try it out it's it's very early um but yeah I already made some
good

[24:23] experience with it uh the fire hose uh product that's streaming right
that doesn't require indexes no not currently not it's just uh the technology
had to extract the data and there's research going on how with an index we bring
this to the decentralized network but for now the technology is there to just
play around so you have to so like in current like a subgraph like it's good
that the person who writes a query and the and the person who runs it uh
separate with uh index and now but for this fire hose basically you have to
write the query extraction layer in Rust then also you have to host the kind of
processor to process yeah currently the streaming fast provides you a playground
to do this and eventually we will have we will have this in the in the
decentralized network so you will then send your sub streams or decentralized
network and then indexes from there will pick it up and do it for you okay thank
you okay guys thanks a lot thank you so much

[25:42] great talk

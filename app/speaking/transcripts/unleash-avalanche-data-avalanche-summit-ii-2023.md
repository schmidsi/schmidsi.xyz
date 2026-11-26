---
source: YouTube auto-generated captions
uploaded: 2023-06-16
duration: 1847
---

[00:04] hello good morning wow so um it's pretty early for a Friday at such a
conference I would say so um I appreciate that even more that you take the time
to um learn about the graph and sub-grouse on Avalanche um like let's start
quickly like who of you knows uh the graph okay who uh has wrote the subgraph
before okay all right then um we can do that together um so quick quick
repetition about on-chain data um I think about ontrend data as uh it's more or
less a table like it's static data we speak about the chain head and the state
of the chain and when we look for example at the crypto punks or any other nft
what the the smart contract really well knows who owns Which nft right now but
the smart contract not really knows it kind of knows who owned it before and
what was the price um it's just how it is like every time a nft moves then
there's a new transaction and then the the blockchain keeps track on the current
state everything the

[01:17] history is there but where is that history so we have we want to have
like this provenance especially with nfts where we can go back and see like who
owned it before or like what was the price it was traded but in order to to do
that um it gets a little bit more complicated than just querying the contract
for the current state um that's what we try to do so that problem with that data
again is that that the blockchain also is not incentivized to give us that data
like when we send a transaction to blockchain we pay some transaction fees and
that incentivized the miners or the validators to bring that block into the
chain and that's that's how it's there so we have a whole incentivization system
around writing to the chain but if you want to read from the chain then we can
try to ask some Json RPC provider about about the data and with Json RPC we can
also only like very it's like not a very optimized protocol to get data out in
bulk so we can ask some notes about maybe events that happened but um like
there's no incentivization mechanism now there is a huge Marketplace of Json RPC
providers and

[02:30] data providers in general but most of them are just a centralized
solution for a problem that should be decentralized in my opinion because like
the data is the goal or is the oil of the you know the news essential tree and
it's very important that we know that which data we can trust when we go to an
exchange and we want to see how the prices develop we kind of want to be sure
that like that chart is not wrong that's not wrong data it's actually true data
so we need to have like some security on top of that but when we look at at the
blockchain like all the transactions they are just like one after another and
all the different protocols on the same chain they actually uh have have a mess
like um it's all together in one chain I know like in avalanche one of the
solutions here are the subnets we will go into this but on C chain it's the same
we have just like all the transactions on top of each other and we want to find
out like oh actually what happened um on on Trader Joe then we need to go
through all these transactions and look at the transactions that Trader Joe that
are from Trader Joe's um contracts and uh kind of throw the orders away and when
we still use Json RPC we end up

[03:44] with a code like this so who is uh who knows about JavaScript who writes
JavaScript I mean you don't need to love it but like a lot of people know it
right so we end up with code like this for a simple thing um that that is like
give me all the tokens from from that owner so we need to go and query that
contract and then see like how many tokens does he have and then we Loop through
that and we see that all these awaits there are um asynchronous calls to to
chase an RPC endpoint all of them take 300 to 400 milliseconds to resolve if
someone has 10 or 20 nfts this code runs for several seconds until we can just
simply display like which nfts that address owns right and that's not that's far
from Optimum um and actually now that problem space that we just described like
decentralized data fast access to data an incentivized also a layer for for
serving store and storing data that's what the graph basically does um so when
we go back to that architecture diagram from before like we had to have the
front end or the depth on a query data and in we don't go

[04:57] directly to Smart contracts anymore like there is a data layer in
between that's a sub graph and we go deeper into what the subgraph is but
basically the subgraph holds all that data kind of also um created for us so
that we can quickly display it on the front end or in any data analytics um use
case that we that we have otherwise um so from that weird async code we can go
to this very beautiful graphql query that just gives off this one request all
the nfts or all the data on information that we need on on the front end or in
our other data consuming applications that's very beautiful um yeah that's
graphql who knows about graphql yeah I love that language it's really like it's
a beautiful way to explore apis and um that was a big step in my in my career
when I learned about graphql and could finally have like a nice API that can
explore and gives me that stuff now the graph is a decentralized network I
quickly touched before um so there are like over

[06:10] 448 indexes that number goes up um we have delegates and curators which
are not so we don't dive deep into it but like also 803 sub graphs are deployed
to the decentralized network um there's also like a host service at the moment
and there uh we currently see like around 1.5 to 2 billion queries a day so the
graph really powers like the biggest applications in the space and on the
decentralized network um we saw until now 2.25 million trt in query fee since
the network launched maybe a year ago or so um and so in the end like what the
graph enables is truly decentralized apps so we have like a decentralized data
stack and we can have this uh this worldwide like redundancy of indexes that
gives this High resilience like also they make query to the decentralized
network we go to an index so that is that is um nearby that can have like a
quick response time and also if one goes down another is there um so that really
gives this this resilience like similar to the internet right the internet also
is a decentralized network if if you want and uh and it all also and I mean
almost never goes down

[07:22] the only thing that can go down is our access to the internet like when
Wi-Fi doesn't work but it was pretty good at this conference so there are the
apps now migrating to the decentralized network um it starts with ethereum so
here are mostly ethereum logos but since um several months we are also Avalanche
C chain is supported on the decentralized graph Network and so now we can really
bring this these subgraphs over from the hosted service to the decentralized
network so that's amazing so if you if you're interested in bringing your
subgraph over um find me and you can set up a working group there are migration
grants um that also help help with that migration um definitely something cool
to do a quick note on Avalanche subnet so we touched it before so if you think
about um creating a Avalon subnets it's like currently the the support on the on
the hosters or the graph Network for the supplement specifically uh is not there
we are working on this currently but there are some workarounds so for example
we could self-host the graph node that um indexes your subgraphs if you go into
the subgraphs oh and but then the

[08:36] network needs to be like the subnet needs to be evm compatible some
subnets they don't necessarily need to be evm compatible which is good and bad
it's good because like we have more um flexibility in how to build that subnet
but it's it's bad because then maybe some Integrations will more complex um but
that's that's also possible with the graph there is a technology called fire
hose which is blockchain agnostic and can bring data quickly into the graph and
other um Data Solutions so if you want to go that route again reach out there
are possibilities to do that so what is a subgraph we talked a lot about
subgraphs before but basically a sub graph is an instruction set that we see its
database schema we Define how a database looks like like how we want to have
actually the data that we need how we want to have it stored so in in terms of
like Trader Joe's they have like one table with tokens and then one table with
Pairs and then one table with trades and that's how um that the whole thing then
then starts to build up right and then we have an instruction set that's that
gear on on

[09:49] the bottom that knows how to fill that database so that the that's
called the mapping so the mapping is the look at the blockchain the look at the
events they can also go into transactions or calls and then whenever something
happens starts to store stuff into the database or removes it from the database
so that um so in the end what we have what we end up is like a highly created
database so if we go from this mess where everything is together on the same
blockchain into like well created databases per protocol that we can influence
how we want to set up this database and and what we want to store in there so
again like and in the end we can query the database with um with graphql also
SQL access is something that is currently discussed and and more so that's very
a powerful way to to access that data and then as I said like the the architect
changes from user interface on the top to then we have an indexing protocol that
service that data for reading and for writing we still go directly to blockchain
because there we have um yeah we have the incentives properly already right um
so how does it look like on a

[11:02] technical level so on the top we have the DAP or the consumer and then
we send transactions to the smart contracts um when you do something we want to
trade in nft and that emits events and then the graph node indexes these events
catches them rides into the mapping module like in it's it's the it's compiled
down to webassembly and then stores in a database and on the left side when we
query then we can query through a graphql API directly to the graph node so
that's that's roughly how this works on a technical technical level um or this
is like a little bit nice GIF that we have that explains like what is actually
happening so we have this mess of of different transactions and in the end kind
of magically they are just ending up like being well sorted cool um so if you
want to tweet about that you just learned about subgraphs that's the slide that
marketing it gave me so we um but like no pressure I see some people do it thank
you so much and yeah but I would

[12:16] say like better is to just do it together now another QR code I know
like this QR code brings you to a GitHub repo where like all the stuff that I do
it quite quickly right now is like explained in in full and I see that one is
more interesting than the Twitter but now um that uh explaining full how it
works and how we uh and also how the code looks like and everything um yeah so
that's this one I mean roughly the steps is like uh we need to install the
dependencies we find the contract and the API then we initialize the top graph
it can create the sub graph already deploy and enhance but let's just do this
together so when you go to I should maybe increase this a bit yeah okay when you
go to the graph.com there is a product here on the top left and it's uh we go to
the subcraft studio so the subgraph studio is the way to go for all these chains
enabled on the decentralized network the hosted service is still around but will
be phased out over the next common a couple of months so when you start fresh go
to the studio

[13:30] then we can connect with a wallet we have like metamask but also wallet
connect whatever you like and we need to send a message and then we can
basically create a subgraph so we can do the small show subgraph here right let
me go and then we take Avalanche as a chain and create the sub graph nice that
needs to be bigger too huh more one more huh okay cool um then the instructions
here basically we can just follow these instructions um so we had like uh graph
CLI installed and then I can just like graph init Studio small show sub graph so
we can do that

[14:45] then we we choose the protocol is it big enough that's too big around oh
okay all right now it's good huh no okay that bigger the better actually okay so
we go for the protocol ethereum because like it's evm compatible then we give a
slug and the slug is predefined then we can just create the there is a directory
we can go here and find um our launch where is it here then we get then we need
to have the contract that right so in that example we already have a contract
deployed on um on avax um and yeah maybe let's look at these small shows here so
we can just click here go to the snow trace and then we can get that contract
address let me just copy paste the contract address over paste tries to fetch
the star block sometimes that doesn't work um then we can just go into the

[15:59] transaction and see at which block that contract was deployed so that's
up the sub graph doesn't need to start earlier it makes it faster yeah if you
start too early like then it's just like the the subproof will start to index a
chain with let's say block zero and then until how much is this 16 million or
something like that just that nothing tries to find events that are not there um
yeah so like that's the contract name and then here's some some magic happens so
we can just say like all the contract entities that took that contract emits
about the auto create some code that indexes it so let's do this um cool we can
already in the background actually oops um graph look a little bit at that code
so the subgraph basically consists of it's It's a node.js um thing so it
consists of a package chasing so we have some commands defined here I start
looking at in the sub graph yaml that kind of helps it together it's the

[17:12] Manifest that we see like okay that's the contract that we want to index
that's a star block these are the entities that are created and then also the
event handlers is like for all these events we have a Handler then we have his
keema that's also defined here somewhere and here we have the schema file we can
look at the schema in this schema it's just like a database definition how I
want to store our data and so we see like for every event select the transfers
are the ones that are interesting with nfts we have like an an event ID from a
two a token ID um then a block number and block timestamp and the transaction
hash so we can then order by uh historically correct and and so on I think yeah
there is a problem currently with my computer but I know the workaround I just
need to use npm instead of yarn um and then the next thing we can look at is the
actual mappings that's where the magic happens um so that's that's assembly
script code assembly script reads very similar to

[18:24] typescript but it's more it's um it's a little bit different there are
small differences with assembly script so keep in mind if if you write um the
sub graphs that like there are some small differences but the cool thing is um
otherwise it it works very well we have um like uh the the the the usual stuff
like Auto completion and and so on so forth but first it needs to install okay
that takes too long we can skip this because I prepared it okay basically the
same thing okay so what I wanted to show here is like um after we write we write
this code graph code 10 it's General it auto generates like uh also boilerplate
code and that we can inspect so like what I do is like on the Mac with command
click I can go into

[19:37] these entities and start to explore them um so you see like okay there's
this this event and then we can see okay what do we have on an event we have an
address that emits the event and so on so forth so that's how we can start to uh
explore the code and and write our subgraphs but we don't need to go too deep
into this because like the boilerplate already is quite useful in my opinion so
let's see what the next steps are so I can now just authenticate here and so
like my CLI is authenticated to the subcraft studio and then I can just deploy
that subgraph y version so best practice is to follow semware and go maybe with
these miners first until we have a really a final version then we can go to
version one and then deploy to or publish to the decentralized network but now
that subgraph is already here see um it jumped directly to 100 because it's the
same as I tested out before this morning it takes a little bit longer to index
but like um we can now start to explore the data so we have like here a graph
called

[20:49] playground on the right we can open up the the Explorer and that's the
beauty bar graphql because it's so heavily typed I can just start to explore it
by myself so we can again look at transfers so we can say okay let's see the
transfers which block number from two token IDs then maybe order by block
timestamp descending and you see we can here just click everything together and
on the left side that the code is automatically generated and then I can send
this query and then I see like all the recent um the recent transactions how
this nft moved around um on chain boom took me five minutes and and we can now
already use that end point when we go here the the the the development query URL
that one we can bring into the front end or just start here we can also just go
directly here you have another Explorer and now we can start to query our
contract that's it um yeah and then later on we can start to to improve here we
can say ah maybe we want to have like different

[22:02] um entities we don't want to have everything stored we only want to
focus on the transfers but I also want to see about the users so whenever there
is a transfer maybe create the user and so on so forth like all these patterns
are described in that GitHub link that I provided but I wanted to show you uh
something else here also so now we know how to write sub graphs and we can we
can write subgraphs for our own depth but a lot of people are mostly interested
to see like what's already there right and there is so much cool stuff going on
on the blockchain and and it's all transparent we can look at everything but um
the problem is that we want to have we want to be able to compare the different
protocols like the different metrics about those protocols like what's TV all
what's Revenue how many deposits they have and so on so forth and then until now
we were looking at different data sources and so we found data source a which
was pretty good on uh tvl but like did not really had information about this
other metrics that we want to track

[23:15] and then there is data source B and it has a little bit more stuff but
like also not complete then it's a data to receive it's again different and at
the end we end up with still gaps and even conflicting information so the
Missouri team from then I stole that slides are a core Dev that also turned to
work on the graph protocol and they want to fix that problem so the idea here is
that we have sub graphs or data sources that are comparable across all the
different uh protocols and then we can start to really look at it and uncover
Trends and so on so forth uh in a in a good way it's all also documented and
laid out and so they have like their data apps that we can see on when we go to
the Missouri website we have these data apps on top here but also um now that's
the and also there is a protocol metrics Explorer we can look into that quickly
um so yeah we have like great coverage around the most adopted apps like like
it's really the the most important ones

[24:29] are there there are there are more than 90 subcrafts already finished
300s are in the making the schemas are standardized like for all these protocols
they have the same like you if you look at Landing protocols it's always the
same schema so we can send the same query to different uh sub graphs that then
give us comparable data about um about these protocols and then in the end we
don't even need to read uh write these smart these sub graphs they're already
written by the misery team you can just use it right um there's a cool list of
these subgraphs so it's subcrafts.missari.io and yeah let's see for example
Trader Joe it's here so we can we can see that that it's here then we can click
on that button click here and then we end up on the subgraph uh that's one is on
the hosted service but there's also subcrafts on the decentralized network then
again we can do the same we have like this this Explorer here there is some
queries already here we can start to explore see like okay what we have we have
liquidity pools we have reward tokens swaps and so on so forth and that for most
speaker protocols that are

[25:43] available so really cool check it out a subgraphs to mystery.io yeah um
yeah and they also have like support of some decentralized Network as I said we
can quickly look into how to query a subproof on a decentralized network so here
um we need to find one first and that's the graph .com actually I need to do it
here so I mean here and then I can move to the graph Explorer so now I can see
which are the sub graphs that are already on the on the decentralized network we
can look maybe at um crypto punks uh there is a subgraph from SRE trekking the
the crypto punks again we can we have a playground we can play around but what
we really need to do is like we need to have that query URL and API key the when
we look at that query URL I know that's probably a little bit small but like
there is a API key play

[26:55] solder in here um so like the next step would be to go to the Studio and
go to the API Keys create an API key the first thousand queries are for free
then we can use it and paste it here now maybe we need a graphical tool yeah and
then we have the the sub graph here so that's how to query on the decentrals
network it's not that big of a step but it's good to know um yeah I think we can
wrap it up here and have some questions thank you so much for joining me this
early on a Friday morning for questions please uh raise your hand and then the
microphone will come to you and morning and world of being the first session on
of the day

[28:07] um sorry just a simple question when you created the sub graph where was
it pulling the data from and uh what was the cost of that yeah that's a good
question so if you if you if you publish this upgraph to the decentralized
network so that there is this 500 or 400 indexers that are then indexing your
subgraph and they have actually two possibilities how to to get the raid raw
data so one is like most of them currently run a like run an archive node they
need to have an archival they could also just like pay someone to run the
archive note for them but it's usually too expensive so for them it's cheaper to
run an archive note by themselves and then access the data with a either Json
RPC or there is a new technology that's coming it's called fire hose that I
quickly touched on uh with the if the subnet Integrations and that fire hose is
much more efficient to blast that data out in in bulks it's kind of a
reinvention of Json RPC but that's roughly how this works um and you probably
think about the payments so by paying per query the indexer incentivized to
index sub graphs yeah

[29:19] and there is more around it like curation and indexing rewards and so on
so forth but like um that's more technical about subcraft development and not
about the graph Network it works otherwise I couldn't do it in 30 minutes yes
thank you for this uh probably the best presentation I saw in this entire Summit
no offense to anybody else but for me personally it was amazing uh just one part
as a developer I didn't understand uh this magical part when you give the
contract address and the book number and suddenly it knows how to handle some
contract like what if I have some like custom Smart contract that's different
that's not rc721 or something yeah okay so what I did here it was a little bit
quick um we see that that contract is uh verified right so the CLI goes to snow
Trace asks for the API downloads at Abi and then according to the API starts to
build the sub scaffold out the subgraph um but I want to say yeah you don't
necessarily need to verify the contract on Avalon on snow Trace you we can just
also just

[30:32] Supply the API during the initiation process they're like here's the
path to the API and then that API will be used so that's another way it's just
easier when it's verified to show actually

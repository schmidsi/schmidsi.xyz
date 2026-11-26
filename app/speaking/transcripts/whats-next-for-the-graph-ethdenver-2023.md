---
source: YouTube auto-generated captions
uploaded: 2023-03-09
duration: 1417
---

[00:06] Yes. Hello. Nice. It works. So um it's a pretty long talk. Basically I
need to rush through so I take that extra five minutes um so that we can a
little bit longer. Um so yeah hello my name is Zimon Emanuel Schmidt. I work um
at edode as a developer experience manager and yeah in this talk I go through
like the next stuff for the graph. Um so you probably know the graph and so we
start first quickly meet with what is the graph today. So basically the graph is
this. So it um it takes so there is this data on the blockchain which is just
like mixed together transaction over transaction and it's very hard to to really
find out what's going on and then kind of with with some technical magic in the
end we have like this well organized and structured data that we can query or
maybe in another setup a little bit more technical explained. Um initially there
were were the front ends which are fully decentralized. We can do

[01:18] this in IPFS and the contracts again like fully decentralized with uh
with the blockchain. We know that um and and that was the initial idea how to
build deps, right? But the problem with that is that uh these these smart
contracts are incentivized for data writing, right? So we we pay gas fees to the
miners. So the miners include that that whole security comes because of that.
But to extract data to read data from the blockchain we have a JSON RPC
interface which was never built to actually extract data in in bulk it is built
for like small interactions. How how can I interact with my local node? Actually
initially that was the idea. So that's where actually the graph comes into play.
It's like it's this it's this thing that sits between the front end or your data
consum consume consumption and the blockchain and and creates this this nice
indexing um layer that you can query. So the graph is basically the data layer
for web 3. So it sits in between there.

[02:20] Um, another way to describe what's going on here is like uh if if you
just use the JSON RPC and you want to do a simple stuff like uh displaying all
tokens that is one wallet holds then you end up with with code like this and
that can take up to 10 seconds to resolve like it's always waiting waiting
waiting. So with the graph we can have like this beautiful GraphQL query which
like boom in one request gives you all the tokens of user and we are also able
to kind of in influence how this query looks like. So that's great stuff. But
the graph is not only kind of this technology. It's also this decentralized
network. As of yesterday or so when I last updated these numbers, there are 465
indexers, 725 subgraphs on the decentralized network deployed. If you want to
deploy your subgraph on the decentralized network, find us, find me. We have a
booth. We help doing this. And since the network launched, um there were like
2.25 million GRTs in query fees generated. So on the network like consumers pay
for query fees and that that was was um generated so far. So we have truly
decentralized apps with a decentralized data layer like there are a lot of teams
that already migrated like Premia

[03:32] uh art blocks pulled together NFTx and so on so forth like um it's it's
really the big big initiative now to migrate everything over to the
decentralized network but not only that the graph uh contracts just scaled on on
arbitrum like the whole contracts they lived on Ethereum mainet and and now like
there is also like another instance on on arbitrum. So like all the stuff that
you do on the with these contracts like publish a subg graph cate on a subg
graph become an indexer allocate and and and stuff is like 20x less or 26x less
gas fees um like it was now just deployed it's possible uh the next steps will
be to have indexing rewards on on arbitrum one and then like there will be a
one-click super easy migration path.

[04:18] So um this is this is great. Also last week um the we announced like the
addition of additional chains on the decentralized network. So far it was
Ethereum mainet and nosis chain. Now it's also like arbitrum salo and avalanche
uh enabled on the decentralized network. So very very fast forward. Also base
launched last week the coinbase l2. So like the Coinbase like the base girly
test net can already be used in the subgraph studio and if you're hacking on
that weekend I urge you to do that because there are joint bounties between
Coinbase and the the graph that you can can get but so far that's for now the
question is what's next right so the graph is a decentralized uh the development
protocol um there are this this working group it's data and APIs indexer
experience protocol networks and operations. There is a snark force and there
are protocol economics. So very interesting topics that going on like a lot of
that stuff is publicly on the forum. So you go to uh forum.graph.com but I will
run through quickly through the highlights um for your convenience.

[05:29] There are six core dev teams working on the graph. Um it is edge node
the company that I work for writing the smart contracts writing the graph node
and other um infrastructure uh stuff. Then there is streaming fast. They create
substreams and and fire host. We will dive into this quickly later on. Uh graph
ops they work on indexer tooling. We also see that quickly. Then semiotic are
this AI research and uh snark folks that are very smart in that. We we go
quickly into it. the guild like superheroes open source um graphql people that
write the best tooling uh al also in web two quite well-known group also joined
as a core defev and then last but not least msari with their standardized
subgraphs we will go into that so in the end there are these three pillars of
success uh that the graph collectively the the core that's collectively work
towards it's like the quality of service Like if you want to query a subgraph,
you should have like a fast and snappy experience.

[06:34] The cost of service it should be a like reasonably priced and affordable
and the developer experience also like it should just be a snap and easy. So
this is the stuff that we focus on and that will improve over time already
improved a lot. The network launched uh one and a half year ago and uh in the in
the beginning there are like some rough edges and there are they're smoothing
out and smoothed out on a continuous basis. Substreams. This is one of the big
topics that uh that was always bouncing around. It's like the the big claim is
like, hey, with substreams you can have like up to 100x indexing speed
improvements. So that's like that sounds like a big number. So what is behind
that 100x? Let's quickly go into it. You can think about the subgraph as a ETLQ
pipeline.

[07:21] Extract, transform, load, and then query in the end. Right? Extraction
works through JSON RPC. transform is with the web assembly that you write in the
subgraph then you store the then we store the whole thing in a in a postgress
database and in the end we can query it with graphql that's how a subgraph works
today it is okay but it is like serial processing there is there are some
bottlenecks it can be slow they can be huge there there are a lot of problems
now the streaming fast reimagined the whole thing like from the beginning and
started with like the extract so in in like the chase an RPC interface is not
like the best one to really get data out quickly and especially not in bulk. So
they they came up with this idea of fire hose which is basically writing raw
block data flat files just out as quick as possible. So you can easily then
start to to use um to paralyze that and and stream that wherever you want,
right?

[08:16] And then we have these flat files raw blocks streaming out as fast as
possible and then they will be transformed. So in the end what we need is want
we want to get we want to know which is the token price how that developed where
is the NFT. So that's where the substreams come in. So substreams are like a map
produce paralyzable technology that consumes raw block data and in the ends up
with like a refined stream of data uh that you then later we can load it and
query it. So the fire host substream only goes for for the E and T in the ETLQ
pipeline. Uh yeah quick comparison. So how does it look like with substreams? We
have these models modu modules and that they can be composed together. So first
we get out the pairs and that the pools and we have prices v1 v2 and you know it
could be different authors also that that write this and then in the end like
several substreams can be combined into one if you just want to have like a
price feed for example. So um that that's what you what we can do with with
substreams. Then this could also be then enhanced with another module that
another person writes let's say about uh sales on openc or any other platform
and then again

[09:29] combined into like something like USDC volume uh over over the NFT
things. So that's the the beauty is really this this modularization and
composability of modules that in the end also can be like parallel uh executed
right. So we can have like 10,000 blocks at a time and then boom parallelize
this across different machines squash together and really move uh fast forward.
Also the developer experience is quite good. So definitely something to check
out. This thing is live as a developer preview like there is documentation uh on
the on the streaming fast website and uh in the next step will be like to really
in include this new technology into the graph decentralized network. Uh very
exciting stuff.

[10:17] Cool. I quickly touched on MSARI already. So MSARI also joined as a core
dev team to the graph and their their mission is to create high quality
subgraphs across uh the the industry and the different uh verticals. So it
starts like okay if you want to start to compare uh lending protocols uh then we
can have this different um metrics like TVL, revenue, deposits and so on so
forth and then we have these different lending protocols. They they they can be
categorized in lending protocols. Um but obviously all of them work a little bit
different. So then maybe we can find a data source A that tracks all the TVL
across all these landing protocols. but they do not go into revenue and deposits
and stuff but we want to have all of it right so then we find the data source B
and there we we find a little bit more there is also some revenue and deposits
but it's not complete right that's a problem if you really want to look at the
whole lending space in general uh that doesn't that's not enough we find maybe
even a data source C that has a little bit more and then we combine everything
we we get a little bit near where we want but the

[11:31] problem is we we still have gaps And like sometimes that we have several
data sources for the same thing. And sometimes the these data sources
interestingly are even um conflicting. So they say like different stuff because
it's different uh uh ways of extracting the metrics. So that's exactly what
Messari makes. They write subgraphs on the graph open source that everybody can
query uh as a public good and that have like the exact same schema across all
these um D5 protocols in the same um verticals. So there's a D5 vertical there's
a lending vertic AMM lending um also a lot of DAO stuff governance is is one of
the categories there's a lot of stuff that uh is worth looking up. So this this
powers their new thing called the data apps. That's something that that you find
there. It's in a closed beta right now. But also um yeah then you see dashboards
like this all powered by the by the graph NFT explorer. Uh a pretty pretty nice
data science stuff built on top. So again they work similar to the deps that we
have like a a UI on

[12:44] top. They query the graph and the graph has index data from the
blockchain. Also they have this um protocol metrics that you find on their
website if you go on the top left on data um and then you then we can see uh all
these different protocols uh how they did the metrics that we want to inspect.
So that's that's a very cool thing all powered by the graph and the cool thing
is when you look at this these dashboards and you think ah I want to do actually
something a little bit different or I want to go maybe a little bit more into
this or that. It's built on open source. It's built on subcraft. Um we can just
build whatever we want on top of it. Another core defaf is the guild. As I said
before, for those people that know GraphQL and web tools, they are very big
there like schema stitching, graphql yoga server, graphicql playground, all
these nice toolings that are making our lives as developer much easier is
basically built by um the guild also the guild joined as a core team the graph
ecosystem and they're now buil working on different stuff like graphql
improvements. Uh so recently they just shipped this and or filters was was very
often requested um but also the graph

[13:58] client uh which I show you quickly. So a simple setup looks like we have
a front like the the data stream goes actually bottom up right. So we have
blockchain data is indexed by the graph and then sent to the graph client and
will be then displayed in the front end. Um one feature that is requested quite
often is like subscriptions. People say like when subscriptions and the guild
works on the subscriptions and the way it will be implemented is with live
queries and we can already use that uh live queries feature to today just in a
client and later later on like this feature will be then introduced uh into the
graph uh node and the decentralized network. But not only that the graph client
helps us to combine multiple subgraphs across multiple chains into one unified
graphql interface on top. So a lot of protocols you know like nowadays deploy
you to uh they deploy to mainet then they deploy to arbitrum they deploy to
optimism then they deploy to based base at some point and so on so forth like
this multi-chain thing is here usually it's the same contracts the same subg
graph just on different chains right now the graph client helps to then just
have like one unified graphical interface across all

[15:12] these subgraphs um and that's very powerful also something with the
graph client also the graph client could be used direct directly uh to interact
with the with the blockchain and also writing mutations and with when when we
have like a with the graph and also write the mutations into the graph client.
Uh then we have like a super powerful real data layer where we can also write
the mutations in the code. The graph client helps send some stuff to the
blockchain. If you write then it goes to the graph and it's displayed. Um helps
with block tracking that we always on top. So if you're a data consumer or a
front- end developer, you should definitely check out the graph client graph
graph ops. They work on two two cool stuff like graph cast. It's a way for
indexers to communicate in a gossip network with each other to uh inform themsel
like each other about like hey what data did you see or h um what's the latest
stuff? Uh very cool. and also the launchpad which is a kubernetes um
configuration to quickly launch an indexer on the on the decentralized network.
So very cool stuff. Graphcast for for those you know built on top of vaku. I
know the image is not the best

[16:24] but the idea is like there is this vauu gossip network that's um built
somewhere in the ethereum ecosystem also and then graph class just leverage that
and builds on top. So very cool stuff here. Cool. So nowadays al there is these
buzzwords right about AI. We we saw recently with chat GPT um that AI is a big
big thing and everybody starts to believe in it. Um Semiotic Labs is actually
one of the pioneers um or like a a research company focusing on on uh artificial
intelligence, cryptography and general software engineering. also they joined
the graph as a core defev recently and um we can quickly look into what they are
um working on. So one of the big problems in general when we look at data
pipelines is like can we trust the data?

[17:22] Is is the data somewhere maybe like what was there somewhere a hiccup
that give wrong data or is even some malicious actors uh in place and the
solution obvious like obviously it's probably goes in the direction yeah I mean
we can use cryptography we can maybe do something with a with a CK proofs to
really know what's going on. So it's the whole topic is verified computing and
um semiotic has has a big focus on it and and just does this verifying computing
research. So the idea is that a a lot of uh calculation is done offchain that
gives that gives the confidence and then in the end just the proof is uh added
onchain should be in a very efficient way so that we don't waste that much of
gas. Um yeah, but to be honest, I'm not like the SK researcher. Um it's just a
little bit of hearsay. I also copied together the slides from these core defs
when they pres present. Um but I think it makes sense of the quick overview. So
so in terms of verifiable computing, there are actually um four projects or
research direction that

[18:35] going on. So verifiable payments this this goes into the direction of uh
scalar payments or uh state channels. So you can think about when you when a
query goes to the decentralized network it goes to one of the of the gateways
and then the gateways also keep keep track of the payments and then request it
from the indexer. The when the when the gateway requests the query and got the
query, the indexer receives a ticket in order to be able to um get get its query
fee, right? Now when we have like on the on the hosted service you currently see
1 billion queries per day. So that's quite a lot of tickets that that needs to
be uh verified efficiently. So that's where this verifiable payments uh that's
that's currently um in progress together with edge node and there were was good
progress there. I think tomorrow one of the streaming uh semiotic researchers
will have a talk that goes deeper into this. Then also verifiable indexing is is
another one. So we need we need to make sure also that the data that we see or
the data that indexers see that that that we are sure that it's the correct
data. Um on JSON RPC sometimes uh there could be missing events or something

[19:48] like that. But when we look at possibilities with fire hose and the full
block with Merkel Merkel roots then we can really build up this this trusted
chain of of data. So that's where verifiable indexing comes in. verifiable
queries. It's probably then like the the end boss is like when we send the query
to the decentralized network, the response should come with a small um uh re
receipt or at the station and just by having these two we can efficiently in the
front end prove that the data is correct. Um so we see that's the next one. Then
there's also snark research. Um in general uh I think they're working on papers
that that can be soon be published. So that's also it's a funny one. Uh that's
actually for for the payment channels started with recursive recursive snarks
and they went up to quarks looked at plunk but in the end ended up with these
homorphic signatures something that already existed but was a little bit out of
sight and um yeah that was from the talk from um from this from these
researchers at Defcon 6. You can watch that online.

[20:54] Um yeah but also AI. So um so they work on this thing about like in the
in the graph network it's quite a complex network. So you have different indexes
you have also consumers um and all of these they kind of want to make the best
decisions and they should also be automated. So, semiotic worked on oops sorry
uh uh some some some AI models to to make it to make the system more efficient.
For example, like that indexers can better actually find the best price per
query in order to like uh putting into consideration like how much uh is is it
actually uh the the cost for running a machine and what do the in other indexers
can have a price for a similar query and so on. So that's a very interesting
topic there that they go into.

[21:43] So in a nutshell um that was a very quick rundown. I know um I'm h more
than happy to share this the slides. Um I hope we can attach it to the video. I
will check that this works so we can go later. But also like all these different
cores have some of them have their own talks. I really uh recommend to check
them out. Um so we have this as a summary we have like multi-chain network
support with with arbitum sale avalanche. um Nosis chain and Ethereum mainet the
fire host and substreams that make that faster the graph client graph cost
indexer launchpad msari subgraphs scaler payments auto agora and verifiable
queries so in the end it makes harder better faster stronger like harder trust
guarantees better developer experience faster query processing stronger uptime
guarantees um that's where we're going through that's where we're headed thank
you so much for your attention Have fun. Happy hacking.

[23:02] Heat. Heat. N. Heat. Heat. N. Nat.

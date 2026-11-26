---
source: YouTube auto-generated captions
uploaded: 2024-04-18
duration: 837
---

[00:02] yeah back uh back then I remember 2017 I went uh to Devcon in Cancun and
there one person told me like why do people even go inside of talks like they're
all recorded you can watch them later on like the actual H um action happens
outside when you meet the people I kind of agree so thank you so much that you
anyways come to watch my talk um yeah let's start let's get into it um how does
it work ah like this so who knows what the graph is all right okay so real quick
um so that that's the graph you know like the blockchain is a big mess of
different stuff and it just magically puts it in order um or we can also look a
little bit more at the architecture that I know from melport back in the days
that we have the front end on top decentralized and then a data layer which is
the graph and then the smart contracts and the blockchain so it enables that
access to blockchain data um or as as said the data layer of FB 3 the graph is
not only just a technology it's also a decentralized network um as of now I

[01:14] think this morning there are 239 indexes independent indexes across the
world that index subgraphs there are 120,000 more delegators uh cators and then
the subgraphs um the one topic that we go a little bit into it so it's a
decentral network of data if you want um as of today um there are 3.49 million
GRT in qu fees already process through the network so you see it's actually one
of those decentralized networks that work and it's not just promises we end up
with truly decentralized data um but the other concept is subgraphs who is
familiar with subgraphs the concept A little bit less all right so a subgraph as
Engineers we can simply think about them as database schemas so like we have
that mass of different data that's on on uh on on the blockchains and we want to
kind of make make a sense out of it so we design a database schema and then some
logic how to fill that database schema according to what happens on chain so as
I said like the the the chain we we all share the same block space all the
protocols share the same block space and if you want to make sends out of it um
usually we not interested in the its entirety but like

[02:27] very specific in the the certain contracts that are there um and then
subgraphs basically you can think of like this logical unit that kind of defines
a database uh that that is very specific to one uh particular use case so when
you for example look at the subgraphs that mesari it's it's writing they have
like for each protocol the subgraphs that are tracking them storing them in a
way that then they can in the end create their protocol Matrix on top of it so
then when we talk about read oriented rollups um then we need to maybe think
about the subcraft data flow do I have a laser pointer here oh nice um so
everything starts with the blockchains so when the blockchains we have all that
data that kind of streams as I said like into these mappings this is written in
assembly script or like in the newer Technologies for substreams it could also
be rust in the end like it compiles down to web assembly um then it's is um goes
to a store it can be read from the store if if if needed but in the end the
consumer can just query it um the magic happens actually here in the um in this

[03:41] in these mappings because uh assembly script also and also rust are
so-called tour in complete uh um smart contract no tour in complete languages so
we can actually code whatever we want inside of of that of that data pipeline uh
so for example um I were there are was a team that um actually wrote the
synthesizer into a sub into a subcraft that kind of gets block data and starts
to generate music out of it but we can also think about maybe some ck approver
that run offchain inside of the subgraphs and then can then funnel back funnel
back the data but we go in that later on so that's cool thing so it's I want to
emphasize it's during complete uh we can offload a lot of computation from chain
into subgraphs um to make sense so there was this idea um that came up it's it's
it's it's a while ago right 2021 but like hey uh we can just like build the
blockchain into the graph protocol by itself if that inherits the security of
ethereum kind of this this idea so then okay how how would that look like and
it's basically very simple just a smart contract we call it the data Edge uh you
can find that also in the graphs Forum

[04:55] um that just has a fallback function that basically does nothing but the
cool thing is we can when we call that that um uh function uh we can provide any
call data into it and that call data is stored on chain right and then we can
write a subgraph that watches that uh data Edge contract and gets that data in
and maybe we can come up with something like oh there is an instruction set
there is some logic going on a little bit similar as Bitcoin people try to have
um their ordinals that have their their logic that might or might not be applied
um but yeah that's the data Edge so from from very in a very extreme way then
the blockchain is just uh like the the data storage that triggers then all that
logic computation in in subgraphs later on um so what's happening is that logic
can move from uh the blockchain to to the mappings um to to reduce the load that
we have um on chain if needed another very interesting component that can could
come into the into play is so-called offchain data um so so far we we looked
about onchain data which is

[06:08] kind of like yeah it's cool we can maybe extract some stuff and and do
more with it but we can even bring offchain data into the mix which makes it
more interesting so when I talk about offchain data what would be offchain data
um so for example it could be empty seats for Airlines Airlines want to want to
want to have monetize that more want to kind of publish that data a little bit
more or we have Hotel Beds um for hotels that they want to publish what's going
on there even like weather stations so we can think about maybe like a
decentralized network of weather stations that all has some offchain data that
we then want to bring back on chain or um uh traditional or like not traditional
it's kind of like server data like requests to a server or like quality of
service response times and so on so on these all usually on chain H offchain um
and the graph could be used with subgraphs um to just publish them I just show
how that would go um so basically the trick here is to have IP have it on ipfs
on R and subgraphs can then be triggered on chain um to then start to download
that stuff

[07:22] from from IP Professor RV and then still go into the maps and store it
in the same store that's possible today already so like for the offchain data
that we had before the graph could be or subgraphs could be and can be actually
the people are doing this um a way to publish publish data make it accessible
because like data access in the graph network is is already it's already made
there are the indexes that store it there are the gateways that uh give access
to it they they care about billing um so that whole hassle of oh I have that
data but I don't want to make it public because then I need to have an API and
the API that needs to have like access control and that access control is
complicated and maybe I'm want montiz it and we don't have a credit it's all
could also be offloaded um to the graph and uh yeah simply by just emitting an a
hash of of an ipfs file or an RV transaction and then download it and store it
um that enables that actually is in use so for example uh um for the gateways on
uh on the graph Network that's what we do is there's a quality of service Oracle
so to say so whenever um someone access the graph Network then it goes through
one of the gateways the

[08:36] gateways then they send these looks some of them they don't need to
necessarily and then go into the red panda materialized a there is a cron chop
and then like regularly there will be the the whole access locks so to say like
which sub graphers access what was the query how which which index was selected
how long did it take to for the index to um resolve that query is then uploaded
to ipfs I think every 5 minute that ipfs hash is then put on nosis chain and
then there's a subcraft that indexes that that data again and then creates the
quality of service subgraph so we can now go to that subgraph yeah I cannot do
live coding here but we can now go to that subgraph and start to find out which
index is the most performant or like which subgraph is the most quered one and
so on so forth It's all um it's all there it's very cool and that's basically
offchain that could like every other company even like not web3 company could
could start to publish data like this and have it accessible but the magic comes
when you when you put that together so I kind of hint quickly before imagine
like we have like this decentralized network of weather stations that helps us
to have

[09:48] like a an oracle that says like did it rain or did it not rain for my
onchain uh insurance for the I don't know syc open air or whatsoever um how
would that work how can then a smart contract know if it rained or not without
like needing to trust maybe Meto sches uh or whatever but then we can think
about like there are like thousands of weather stations that are just uploading
the weather data that they see into into HS and then anchor it down on chain and
say like that's what I saw then we can more or less have like a more trusted
image about what's going on nice that's all kind of like around using what's
what's already there with with with the graph Network like so as I said we have
the indexers we have subgraphs indexers have stake that secures the network um
we can work like this this is outdated and then we are back on chain so now we
have all that on chain data we talked about server access locks quality of
service logs and also um decentralized um uh weather oracles but um when you
want to bring it back on chain that's the thing like with a decentralized WEA
orle we also want to have like this there's this booing thing

[10:59] of like do we need to pay out the uh the insurance sum or or not like
and that's where oracles come back into play so I have like there are two
examples like gelato for example if the gelato web three functions uh they could
they can read from a from a from a subgraph on the decentralized graph Network
and then put it back on chain and then say like okay actually it rained so you
can have so you we need to pay out um yes that kind of closes the loop the cool
thing is um all that information we we we go later into that also that is not
just like someone has said but there is some economic um proof on top of it um I
think it's the last slide so just to recap quickly so why are we are I'm why am
I talking about subgraphs as rollups because basically what happens in rollups
is like we have the block we have the L1 and then the the the the state goes up
the state will be changed and then the the change State goes down and so on so
forth so that's kind of like how we can think about the rollup and now when we
go to the to the graph it's read oriented rollups it's

[12:13] like there's also State happening on L1 that gets goes to L2 there is
some computation going on and now if oracles we can even bring it back on chain
um it's a little bit different it's kind of like the focus is on reading and
processing um yeah if that makes sense yeah uh closing thoughts about the
verifiability um yeah when especially when we have oracles that bring stuff back
on chain it's like it's like when when we look at this let's say gelot web3
functions like they can query any endpoint but um what we need is uh U we want
to we want to know like is it actually true and so with the with the indexes on
the graph Network the thing is that they have um stake so all the indexes on the
graph Network stake a good amount of GRT some more some some less and then
whenever they respond to query they send the so-called index attestation back
and say like I um with my Stak say that's true and if someone can prove them
wrong then can be be slash so it's not just like something it uh it's actually
um yeah they they prove if their stake um there's also more going on like um can
we have more verifiable indexing more

[13:27] verifiable queries index also start to talk to each other with gossip
networks and so on um to to see if they see the same data but in general this is
how it works it works with that with that stake at the moment um yeah it was a
bit quick one right but as I said like it's recorded so you can still watch it
maybe relax at home um this is my the link to my Twitter if you want and um yeah
thank you so much for having me

---
source: YouTube auto-generated captions
uploaded: 2024-07-12
duration: 958
---

[00:02] does this work nice it works uh do Broan H thanks for uh being up
already that early uh I like in Belgrade like um you know you guys know how to
party uh that resonates with my lifestyle um but yesterday I I was kind of
serious because I had my talk today so but yeah let's go into it um yeah my name
is Simon or Simon or um I thinking ser you would say zimo no yeah okay um so I
don't care about the pronunciation actually um it's just just uh yeah Simon zimo
and today we talk about uh the the graph or like unleash the graph sta it's a
little bit the marketing title the more nerdy one is like we talk about the idea
of subgraphs as read oriented rollups does this work a little bit okay cool
let's get into it so um who know knows what is the graph I do yeah so most most
people nice okay so um the graph like simply explained nice it works this time
with the if the animation is uh yeah it's just like takes all the data from the
different blockchains and also from

[01:15] offchain data and then brings it organizes it in in an easy way so it's
easy easily accessible or we can also look about um the architecture of adapt so
we have the front end on top the idea here is like that's a decentralized front
end so it's maybe distributed with ipfs or RV and then we have the subcraft that
sits in between the front end and um and the contracts which are are on the
lower L level and the contract after the blockchain data so that's roughly uh
the system architecture that we we want to say so that that's actually is then
the data layer of web 3 kind of the the big the big claim here um and it's true
I mean it's like a decentralized Data Network it it runs in three years already
or even a little bit more like as of now I think it I had to send in this
presentation a month ago so like these numbers change but like uh there are 107
indexers 100 and uh uh uh 60 64,000 delegators that number went up a lot since
um we trans we transferred the the protocol contracts from mainnet to arbitrum
so it's much cheaper to be delegators so much more people become delegators
everybody can be a delegator so look into it uh there are also uh 732 cators and
the sub GRS that number goes

[02:29] up now very fast because like on the 12th of June the hosted service
which was the centralized offering to demonstrate product Market fit of
subgraphs will cease to exist so if you have any subgraphs and you're still
using them or use any subgraphs in your application or your data science stuff
then please upgrade you can talk to me I help you upgrade as of now uh 3.4 3.57
million query fees were generated or like sent through the graph Network um it's
roughly $1 million us with the current prices so that actually gives a truly
decentralized data so like the graph network is a maybe if you want to drop a
boss word here like the what is it dpin decentralized P public infrastructure
Network that actually works um in all Builds on top of subgraphs and we want to
kind of like go into this in like what are subgraphs how do they work and why do
we can we think about them as read oriented rollups okay so what is this
subgraph simply said um let me try this again on top we have uh the database so
subgraph defines a database schema then we have um a mapping that says how to
fill that database schema according to the to to

[03:41] the data that we see on chain so so think about just a database and uh
instruction how to fill that data base with onchain data so that's basically it
so what happens then is like that on the blockchain we have all these
transactions from all these different protocols um lined up and and we we share
the block space right right I mean at least on L1 and and on the big l2s we will
see where it goes with all these St chains but this is kind of a little bit the
reality that we we share block space all the different protocols and but what we
need is kind of like a a dedicated view like that we just look at one protocol
at a time so this is what sucrafts enable uh they're fully um programmable we go
into that later so the subcraft data flow as I said before we have um blockchain
data first comes in then it runs uh mappings in assembly script or rust um
depends if you are in sub crop or substreams land then it it rites to the store
a database we can also read from the store and in the end we can send out
queries to the customer that's roughly how it works um the cool thing about
assembly script and rust um there is a lot of magic in it right uh these are T
incomplete languages um I don't necessarily need to

[04:54] explain touring completeness here but I think you can think of it you
can do whatever you want like they're fully yeah whatever like so for example
one of the side projects that I worked on with some artists was to have a
synthesizer that runs in the mappings of a subgraph uh and then according to I
don't know like the block cash of the nft that get minted gets audio generated
uh so you can do crazy stuff like this but also um this idea that came out
already three years ago also uh kind of this idea of like say hey we can
basically just build use the graph because like there is this um this
determinism each subgraph is clearly defined um B basically as a mini blockchain
so we just put very small stuff on chain and then like all the computation
happens on chain so that lead has um that has created this so-called data Edge
smart contract which basically is just some similar to rollups right they also
just uh uh store some some State on on L1 uh we could have that data Edge where
you can actually store whatever you want uh in in into the blockchain and then
we

[06:06] can use something like the graph to index it and then even make sense
out of it so what happens is that um logic moves from the blockchain or from
Smart contract into into into assembly script if that makes sense so this um
also like that this thing like moving logic or computation outside of the
blockchain into another system that's um also now has like a lot of new um ideas
around and then goes into this AI co-processing so there is another Co core def
at the graph semiotic who who looks into this Co co-processing a little bit more
um I explained the idea with with sub GRS as they are something that's already
used but um if you're interested in this thinking um check out the gra.com blog
there's there's a lot of talks about now how that's works with the Cod
processing and so on okay so we talked about onchain data and and um tting
complete mappings so that we can move logic to outside off the chain so to say
but we also want to maybe have some offchain data um when you think about
offchain

[07:18] data um it's everything that exists that's not onchain maybe but what is
interesting and maybe also like to frame it a little bit what would be something
that I want to publish or someone wants to publish could be uh airline free
seats for Airlines they maybe want to publish this somewhere I mean currently I
know there is some um I think Amad or some some some centralized service that uh
kind of is in that market but we could theoretically think about just publish
all of it on a yeah in a web threeway right uh we can think of threee Hotel
seats pretty similar but um also an interesting example would be um with uh
weather stations so we have a decentralized network of weather stations and we
can put that data onchain and and then run computations and then actually um an
example that we do at that to note is um server data so like access data to a
server we can also then publish publish onchain so how would it work um so the
IDE idea roughly is we go in the same uh steps um but now the mappings not only
have access to the store and the blockchain data the mappings also have access
to ipfs or RV data um and that's actually very simple so someone just uploads
that data let's

[08:31] say on ipfs takes the ipfs hash and then puts it back on chain and then
we have a subgraph that indexes that contract get that one and then it can start
to download from IPS so that works actually pretty well um and with that as I
said we came up with this um or like the data science team at came up with this
uh so-called quality of service Oracle so when people send queries to the graph
Network they go through gateways and from the gateways then to indexers um but
so the gateways actually know which index is fast to respond to which query to
which to which query actually and that's something that's important that we want
to want to know in the ecosystem like which indexes are actually performing well
um how that works is like the logs are then piped out of the gateways into red
panda and materializing I mean like that's that's some data side stuff that I
don't really understand but where I understand it back is like when it goes on
chain so then they publish it to ipfs and then they use um open sapling um
triggers to put it on nosis chain and on NOS chain it get index as a subgraph
and so now we have a quality of service Oracle so whenever you kind of want to
know which are the highest performing

[09:43] indexes which are the ones that have the quickest quer response times
and so on um there is a there's a subg graph for it you can create on the graph
Network um yeah the other thing that I said is my more like a hypothetical thing
it's like if you would think about um weather stations so that could be like a
DP network of independent weather stations everybody runs that at home maybe get
some tokens to run it blah blah blah but they all upload their data um into on
onto IPS or R gets anchored back on chain and would could feed maybe then that
we go later into uh an oracle that would be like uh I don't know you create an
open air here in Belgrade and then you want to know uh on chain if it rained or
not because you want to trick Trier the the decentralized insurance um and that
would might might be a thing because like if it's if it's a lot of independent
people that run these weather stations then maybe we can trust the data more
than it was just one uh agency that would give that weather information that
could also be corrupted I don't know kind of a theoretical example here um but
yeah reusing the pre the the properties of the graph Network that already exists
and as I said already served that many queries um

[11:00] yeah as I said like um the that's about monetization so when we have
data that we want to publish usually it's a problem that's why often times
public data doesn't get published because then someone needs to have that API
endpoint and that needs to be rate limited and maybe we need to have
authentication maybe we want to have some some billing on top just to pay our
server fees and so on so forth but like with what I just said is um it's very
simple it's almost for free to publish that data and make it accessible and then
basically sell it through the graph um Network yes so back on chain as I said
like these both things we have like these oracles for maybe weather and quality
of service um we need to bring it back on chain and that's actually something
that that already works there are the chelato web functions but also the chain
link um chain link functions that can get data from the graph Network and put it
back on chain um so so there are different use cases so for one would be like
the one that just goes with onchain data that would do like complex comp
computations across on chain data that's gets in the subcraft and comes out with
just one value that maybe I don't know let's say for um for a def risk
management thing that that could be piped outside that one or as I said with

[12:14] offchain data that we even um get in weather data and then we have an
onchain uh contract that can say did it rain or not according to to that setup
so that would be the the full the full um cycle that's why that idea about
rollups comes right it kind of like with with rups we also um want to offload
computation stage from L1 to make it cheaper and faster but you also want to
bring it back on chain like for for the or like back on an L1 for what what what
concerns L1 so to say um so that's the the roll up thing and when you look at
think of subgraphs as I said then the the data gets up gets protest and we can
bring it like very um we can bring it down on chain if we need um questions are
later but um yeah thanks for the contribution um yeah so then there's of course
there's this question of verifiability um so the data that gets indexed
currently there is this proof of indexing going on um it is uh index when they
see data then they computate um a hash on top of that data put it at back on
chain to say

[13:27] like they actually I index that data they can they start to U talk to
each other and um although they they compete they also talk to each other did
you see the same data on yes no should be um should be very deterministic you
can think of but interestingly it's not like different configurations of
different uh ethereum node or L2 nodes then could be that sometimes an event
gets missed and interesting stuff like this happens and we start to uncover it
by having that system um then also with the query when we send a query to the
graph Network each indexer responds with a query attestation and says like I
with all my Stak that I put into the network I guarantee that it's true right
and then if that if that could proven wrong it can get slashed there are
fishermen so there's this kind of gem Theory going on um but obviously we want
to move forward into more like strong um guarantees which would be verifying
indexing querying um and there is First Steps going on like simple data
extraction from from chain um with when we when you get that mer Merc Roots up
into that indexing layer then we can have start to have some um some some uh
some checks unfortunately Jason RPC doesn't really help with that so there's
this

[14:39] reinvention of data extraction going on um that also other teams do but
like what in the graph ecosystem it's don't the fire hose um so we can have
maybe this these guarantees later on and then like all these verifications then
go layer on layer we trying to work up but um that's future and I think that's
it all already um you can scan my QR code follow me on Twitter my DMs are also
open if you have any questions but I'm also still around now for questions and
you can also try to find me uh yeah as long as I'm in Belgrade thank you so much
so we have some time for a couple of questions so if there's any questions in
the audience feel free to raise your hand don't be shy don't be shy we're
totally cool dudes we're there are no wrong questions I I I think I think the
baby asked all the questions like it was a good question anyway like like thank
you thank you so much um Simon for for being here for

[15:52] sharing your knowledge give it up for Simon

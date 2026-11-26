---
source: YouTube auto-generated captions
uploaded: 2023-07-25
duration: 892
---

[00:00] and next up we have Simon Schmidt from Edge and node who will be
discussing uh new use cases and benefits from using uh subgraphs hello do you
hear me is it good enough nice oh that works yeah PCV Kat thank you so much for
taking the time um to still come here and interest some information I hope for
it's useful my name is Simone I'm developer relations manager at you know that's
one of the core deaf teams that is working on the graph and in this talk which
is a new talk I quickly go through this idea that was once um coined I think one
year ago by Brandon Ramirez at the graph day um and it's going about the sub
graphs into read-oriented Roll-Ups it sounds a little bit weird but uh we will
build it up over time so just a quick recap what is the graph today so uh it's a
PDF that is a gif otherwise so like the graph is basically taking that mess of
of uh of marbles and organizes it and that's what the graph does on on data of
blockchain data so um it's very well known for this middle layer in

[01:14] between the front end and the contract as the data layer that provides
the data for these front ends in a quick fashion so it indexes the data on the
blockchain prepares it so that the front ends can quickly use it well known
adapts like uni swap analytics for example uses it and much more so it's
actually a little bit the industry standard for that specific use case like a
front-end that has data needs and needs so data through the graph um so as I
said like we also talk about the graph being the data layer of web3 so it should
so the vision is really become like across all chains and all protocols to have
this data layer and the graph is not just like a service provider the graph is a
decentralized network where we have currently 281 individual indexes across the
world a bunch of delegators bunch of curators and thousand subcrafts deployed to
more than thousands of graphs deployed to these decentralized Network so that we
can really create access that data that yeah and after today we have almost
three million trts and creative fees claimed on that this decentralized networks
so that query Market is working and that leads to truly decentralized data like
the data that is on the graph

[02:27] is open and accessible for everybody so that's the graph quick recap so
then let's go to this read-oriented roll up so what is this and what are sub
graphs anyways so a little bit more technical a sub graph is basically a
curation function so that we can say which information on the blockchain is
trusting and how do we want to store it and then store it in a in an index so
that we can later on consume so the data comes from the blockchain it usually
just starts with the blockchain gets into mappings which are written in assembly
script or rust now with the substreams the new technology and then stored in a
database and the mappings can also access that store and in the end a consumer
can query it that's very simple data flow um yeah in in my presentations here
when I click there is like a it's a magic stick coming because I think the magic
lies in the in the assembly script and in the rust why because the the language
that we write the subgraphs in it's it's assembly script or a rust with
substreams and that is Turing complete during completeness means that we can
code everything like that we can code

[03:40] with solidity or JavaScript or typescript or whatever like during
complete general purpose language we can code into the sub Graphics um into the
subcraft mappings so for example we can have a Merkle tree prover that checks in
the subgraph if if an entity it belongs to this merku tree or we can have like
some ck proving algorithms that would be too hard to run on chain can run in a
subgraph or even like I saw a side project from someone that would that created
a um a synthesizer inside of the sub graph that depending on the Block and nft
was minted created a different kind of music all happening inside of the sub
graph so the interesting thing is here we can use the technology to run quite
complex or like expensive Computing that would be too too expensive on on a
normal Network or especially on chain in a subgraph so that's very cool that
already gives very cool use cases and then two years ago this guy Dennis Denison
he runs tally um he played around with this idea of like oh wait so when we can
have like all this logic inside of a sub graph what can we then build with the
top graph when it came to this kind of meta idea of like hey we can have a

[04:52] blockchain into the subgraph that connects with stuff on the main chain
or like even he talks here about ethereum I think gas prices were lower back
then but we can also think of noses or polygon or whatever um that then just
triggers stuff in a subgraph and the the code actually in solidity to facilitate
this is like this it's basically we have a contract it's called the data Edge
there is a specification about the data Edge you can read it in the Gip I will
later on also link the the slides and then that just has one function the
fallback function that's that's always called when we call that contract with a
function that doesn't exist and that's it and it does nothing but what happens
when we call that function is like that everything we like all the call data
that we send to that function gets stored on chain and can be indexed by the
graph and that's how they started to build that social network on top of it
because um they just send a Json that says like add create post from blob
content X and the sub graph was Ableton to build a completely database that was
displaying that data so that was fun in a way and it's interesting to think
about but it's also like I don't know

[06:06] yeah let's see how how important that can become um so what I what
basically happened is that the logic moved from the blockchain to the subgraph
to the mappings but actually so this is the first primitive so we have like tune
completeness in the mappings in the subgraph we can run or we can run big code
so the next step is off chain data now it gets interesting so the graph is has
the possibility or a graph Network to also index data from ipfs and RV and put
and then yeah add it to the mappings and put it into the store so now we can mix
and match so in the social network from before we can upload um that that pose
just to ipfs and then anchor it down to that to the data Edge it gets then
indexed stored and we can we can query it with with everything that we have but
that's not all like the the the the team adage node started to create this so
like the graph Network the multiple gateways across the world and then multiple
indexes across the world and people and queries go to the gateways and enter the
indexes what's very important for every kind of stakeholder of the graph network
is we want to know like what's the quality of service how do these indexes
perform the kind of uh something that gateways know

[07:20] in a centralized way because they have like web 2 connections and now
they worked on this idea of republishing that data so how does it work every
Gateway that is there um has logs they know like okay I sent this request to
that indexer it took that long and that's it and then they put it to this data
science pipeline red Ponder materialize that's not my thing but in the end there
is chrome shop that uploads that big data it's a lot of data that that is that
is there into ipfs anchor is back with open sampling um uh these things that we
can trigger on open sap into right on chain and then the graph indexes it goes
back to ipfs and has its own so now we have a we have a network quality of
service or Oracle soft graph that we can query and see like which indexes which
quality of service which subgraph performs how and so on so forth all in a very
decentralized way we can even think about other use cases that come here like I
know it could be any web 2 Data basically it could be hotel rooms that are free
it could be Airlines seats that are free they all can be the same uploaded to
ipfs anchor on chain index by subcraft make it available through the subgraph

[08:32] um or also like a very interesting use case would be we can have weather
stations that do the same like we have hundreds of these weather stations they
all upload that data and create unchain the subcraft gets it combines it
Aggregates it and then we have like a a current weather or like a very good
information about how the battery is currently look like and that all Builds on
top of what's already there with the graph like indexes are already there so we
don't need to even think about infrastructure because if the subgraph is
deployed in ipfs deployed the index is indexed and and make it available to
query and and the other stuff also payments um indexes get paid to serve queries
curators can create and sub graphs in order to participate in the query fees so
the whole power of a decentralized network with all the incentivized different
stakeholders can be used to also publish web 2 Data and now even uh this this
week we launched this new billing thing on the graph Network before like we had
to bridge trt to arbitrary in order to pay uh for for the query fees now there
is a super simple um a subscription thing where you can just say like okay so
that that many queries

[09:45] boom per month that that's it deposit usdc and then it just runs so if
anybody's interested running that find me we can help you but now we got even
one step ahead so now we have all this data we saw like it's blockchain data we
can even calculate um on blockchain data maybe more complex um risk parameters
or something like that we have the off-chain data that's the own ipfs but now we
can bring it even back on chain so how would that work so we have the blockchain
mappings again as before and now instead of just a consumer that might be front
in our data science application we have an oracle that brings it back chain link
launched chain link functions I think a month ago or two and at the second at
this hackathon and also like during the fccs are different examples there's
actually a Live code example how to use the graph in chain link functions to
bring data that's on the graph pre-computed or prepared for whatever use case we
have back on chain also gelato has web3 functions that can do the same so now we
have the whole flow of data

[10:59] so to finalize and talk about this read oriented draw ups and why this
model that I just explained kind of fits into this narrative is like when we
have a roll up in this example BF State that's created on the on the on the
secret web then it's um proven and and put down to L1 and transactions can also
go up like there's this interaction between and now when we when we have a read
oriented Roll-Ups it's it's a little bit similar but like the the state comes up
it will be computed or computed and changed on on the L2 or then in the subgraph
and then can be rolled down again with the oracles to L1 so that's where this
read oriented rollups idea comes from and that's kind of explained in these
things so um at the end I just quickly want to go into this one big topic which
is probably the elephant in the room when we talk about Oracle of data in
general it's like verifiability like how can we trust the data that we see um
it's one topic that is very core to division of the graph that really this idea
of like okay if you see web 2 Data

[12:11] do we know if we can trust it if we see data from a centralized data
provider how do we know if the data provider does actually giving us the right
data or not and so if we I don't know go to centralized data provider and ask
for a price of a certain token the centralized data provider might give a wrong
quote in order to game the system a bit so with the graph if the current
implementation it works like this each indexes need to stake some indexes take
more indexes take less whenever then there is two steps so first they do
indexing they see data they index it they compare like index comparing with each
other like which data that they see it's so-called proof of indexing so the the
hash basically the hash data in a in set intervals we call them epochs and put
it on chain so that the orders so that we can compare and that's one so we see
okay the indexes are the same data and then the second obviously is like then
the querying so the improved indexing helps with um I would say faulty software
because they can compare did we see the same data but if a malicious indexer for
example wants to return wrong data like consciously

[13:23] then it would happen at the query layer so what indexes do is like with
each response they send the so-called query assist at the station and with that
at the station um we can then we have a response of that query and the data
station and later on we can when we can prove the indexer wrong that that
response to that query was actually wrong the indexer can get slashed and that's
how these oracles also work so they take the response put it on chain but also
the attestation and also with chain link we take then the responses from
different indexers and combine it and see is there any difference and if it's
all good we put them on chain with data station and if we later on see that
something went wrong we can slash the index so that's not perfect it's kind of
optimistic um so that's where actually we can go to the Future and there is this
the one core Dev team is particularly at the Grove semiotic from Los Altos they
work on this big problem with called verifying indexing and querying kind of
having the whole stack like the indexing really verified with this CK proofs of
what they saw that's also a little bit below my uh above my brain level but like
that's kind of the end called really have like I receive a response from the
from a graph indexer and I can check the response with that the station

[14:35] directly without needing the trust so that's where we're headed and um
yeah hopefully we will achieve that state soon but until then thank you so much
for coming here and watching The Talk

---
source: YouTube auto-generated captions
uploaded: 2021-10-01
duration: 1397
---

[00:05] very nice building i like it it's kind of an old school learning
environment yeah it's kind of a home um yeah my name is simon i work as a
solutions engineer for the company called edge node which is one of the
companies that building the graph we recently had joined a new company called
streaming fast and so we also decentralized development which is also very
exciting yeah and i will quickly show you how we can do very very rapid soft
graph development or like the initial start for nft soft graphs um so what is
the graph who knows what the graph is okay that's pretty good and then um who
has ever delegated grts in the graph network okay who brought this up graph
already okay so we have more subcrafted looper than delegators it's interesting
then who's running an indexer nice okay good so i think more or less like the
sorry yeah no

[01:18] no yeah so um yeah so so pretty much the graph kind of or we've been
kind of the default part of the stack for um yeah for every application actually
on ethereum and other evm compatible blockchains um i mean like big names like
uhneswa uh i know depend on the graph which is quite honoring for us to have
this deck but so so how it actually works is um the problem that that we had
let's say especially if the nft space is if we have an nft it's quite easy to
query uh who is the owner of the entity and all the actual kind of the current
state of the blockchain um but it is difficult to know like who were the
previous owners of this nft and especially also like what was the price paid
when women switched hands um and so that's actually where the graph comes in so
you can write the subgraph that says like okay watch the blockchain for these
events and if and and then if

[02:30] these events happen then um we have kind of a database that we are
storing kind of the index um and then we do indexing then the blockchain
according to the specifics in the subgraph and with that we are able to deliver
very fast queries for for this this province for d5 the other examples like
historic trading prices or like the performance of the portfolio um that's
that's i think it's not possible to actually do it above the ground so um so
currently it's a little bit of old uh chart but um it still makes sense so i
think like 50 percent of the sub graphs are roughly half or for d5 but we see
like art and collectibles or nfts in general already are 14 of the deployed
software so i think it's a growing space and that's why i want to focus a little
bit on how can we deploy develop these subgraphs um yeah so we recently launched
a software studio before it was like a decent soccer explorer but with the
subgraphs studio it is possible to deploy actually a subgraph directly to the
decentralized network and have it

[03:42] indexed by a a big group of indexers who are actually competing in an
indexing market of delivering uh the best security results so this gives like a
great resilience and it's 100 decentralized um but if you want to start creating
your sub graph the first step is you should plan first a little bit um so my
first uh point here is like please follow standards or look at other soft graphs
and and kind of try to follow what they did because that makes the
interoperability of the of the subgraphs um much better um so there is this uh
this f4 uh nft standards of vtf that you probably know kind of co-organizing
here and um but this is very important there's also the panel later about about
the standards which should be better um yeah and then you need to think a little
bit about the schema that defines like the database schema how you want to
structure your data and then out of this database schema there will be a graphql
schema auto generated so this is sometimes like beginners a little bit mixed up
especially if you know graphql

[04:55] already like the schema that you write is basically the database schema
and then the graph the actual graphql schema is auto-generated and then you go
and then you identify in your whatever application you write like the important
objects and concepts um we go deeper on that but what is what is this for nfts
and then yeah then you should agree like store aggregation data i know you if
you have aggregation data like accounts or stuff like that you have also
entities to store that and then you try to link two entities together and in the
end if you are the author of the contracts in terms of then keep in mind you
should design the context in a way that the events emitted actually have
everything you need to index it and to build a meaningful index because um that
way you we can really do a fast uh indexing of your subgraph other ways like you
can do call handlers and a little bit more hacky techniques which are possible
especially if you try to build a software for a contract that you didn't write
or you don't don't want to change anymore um yeah but if you write the contracts
then you should have that in mind um currently we have a little bit the problem
with with ipfs so it is when the

[06:08] whole story is possible to use it but in in the decentralized network we
are currently working on it i don't know what the exact situation is so keep
that in mind because with energy it makes sense to index ffs data that said i
mean it lie like nothing it's not stands nothing in the way to just to already
start and upgrade your software it's easier to upgrade software than to create a
contract um but then think about that's also something if you write the sub
graph if you write the depth also by yourself then it's quite clear but if you
just write the subgroup then you probably want to think about okay what are the
common queries what is like what do people which questions have we have people
if they look at your protocols so for nfts there is like okay if i have an nft
project how many are there in total and then obviously how many are the trades
trade x so you can have like these rarities extracted that's important then who
owns which nft currently but what was also the provenance of it um and then yeah
also like this is really the right uh nft or is it just a cheap copy and then
for the on-chain marketplaces we can get the historic prices for this uh
off-chain it's it's currently quite

[07:21] complicated but um with crypto pumps for example it's possible because
the on-chain marketplace or like at least some of them and but on top of that
you should also think about what is your nft project what's the specialities
what is the unique selling point proposition and that's where you can actually
enhance um and bring in your magic so here um a very rough schema overview
that's kind of maybe the current state of thinking about standardization we're
not quite there yet but you see these are uh the entities that you define so if
you have a contract that represents the collection by itself so for crypto punks
for example that will be like one what entry then you have to address then the
count how many are there how many owners are there and so on so forth then you
have the account which represents an owner like an address on the ethereal
network then then also for the account to kind of save the current holdings um
then the nft by itself like the token um for that you want to have the token id
which is important but also the metadata uri which can be in any format which
can which is problematic actually to index it because inside of the graph we can
only follow ipfs so we only plan

[08:34] to follow actually rpfs we never intend to follow uh arbitrary url uri
because that would break like a assumption that we have about them what's the
word determinism thank you and and we need we need we need to determine the
determinism for indexing the subgraphs to prove if the indexing is uh is right
and if a career is right because we have a decentralized network of indexers and
you can imagine that maybe a malicious indexer would try to i know deliver wrong
data and if that happens we need to prove like okay this data is wrong and for
that all data needs to be deterministic so we cannot just like go https like
your uri slash fpi slash i know jason because then you it would be so easy to
just change that uri or sometimes your server is down or whatever so that's keep
that in mind that's also maybe the biggest problem with nfts currently in my
opinion that most some of them are just like linking to a metadata uri and who
knows how long this uh uri will be available um yeah then we have event
interfaces obviously there is a transfer event

[09:47] which is interesting the mean demand transfer event from the address
zero but also for the on-chain uh marketplaces you have to beat ask and sale for
every event uh it's recommended to have like a block number block hash and the
time stamp so you can have like then this helps to to query or order or sort and
sort your queries then you have metadata if available and also trades if
available you can do separate entities that also helps with querying yeah so um
the steps are the like there's a really fast track that i want to show you so
the step bar um i created an example repo that is just like a very minimal esc
721 a record that you can clone and extend then you just install the
dependencies to change the data source to whatever contract you want to index
you can deploy to the studio and see already what's there and see the indexing
then you can go back and start to extend and change redeploy and so on and so
forth up to the point you think like okay my subgraph is it's perfect and then
you can publish it to the decentralized

[11:00] network then you start to signal it with grt tokens and then index or cr
that's probably an interesting stop graph and then they start to index it for
you and if you signal and it's indexed and it's queried it gets a proportion of
the query fees yes now the exact moment so um where is this mouse okay so um i
created this um very quick app on top of a subgraph written by hadrian so there
is a kind of this is generic like a erc721 socrate that actually just indexes
all of the ears it just checks every transfer that happens so you see like these
are actually the the transfers that happen currently so we see for example
that's maybe a good example so this is uh i know some untamed elephants probably
cool nft project let's check it out i need to work on the mouse oh here is it

[12:15] so we can go to either scan and yeah and check out the address and here
is a subgraph repo uh yeah you can just clone this and download this and then we
have it um here i already downloaded it because yeah i don't know network so we
can start just copy over the contact address and also it is recommended to check
at which transaction or at which block the contract was actually deployed that
helps the indexer to be faster if you do not specify this index starts at block
zero and you see here this was deployed recently so it would be a little bit a
waste of time just check for events with contracts name is

[13:38] untamed elephants that's all ready now you can go to the um actually to
the graph.com here is the software studio connect metamask okay gracious now i
just need to authenticate please don't copy

[15:05] yeah now already this upgrade is compiled yeah you should give a version
numbers anytime you change it for a new version so that also uh the indexers
know that there is a new version of the same software and you see now it's
deployed already we have this kind of new urls here and in the background
magically uh the studio already knows that there is a new subgraph deployed now
let's check i mean progress of thinking is already not bad you can check to
start the query and um it already has uh the tokens and some owners see so we
have now in five minutes i created our first nft subgraph from a random project
and if it's your project you're now able to go in here and work on the schema
extend the schema and then work on the mappings file actually and here you can
extend whatever look look what's there and then you can create a new version and
redeploy and um yeah that's it so it's pretty easy to to make these sub

[16:19] crops it's a very um important building block on decks and modern depths
and um yeah and since two weeks it's possible to deploy fully decentralized
subgroups um i think that's something you should try to do so i've put together
some resources for the it's a little bit a quick talk and but you can go go here
and go deep and read through this there are a lot of official talks which i
recommend to read they are also they were also updated now for the new release
um then there is a very great and very in-depth um sub graph workshop from
nodder so on this record you can um and can really like read the readme from top
to bottom and then it walks you step by step through the topic of uh yeah
subgraph development then obviously then there are like the open separate
software from hadrian which he announced yesterday which are very cool if you're
using the open zeppelin um smart contracts which you should use when you ride
smart contract then you have already prepared building blocks and there is even
a common line to

[17:31] not officially from open setting but there is one where you can just
like easily uh start the boilerplates of your custom software so if you if you
go a little bit more uh more deep and more complex with your contracts you
really have to check this out then you see my generic erc721 softcroft template
um yeah honestly it's not the best but uh the the idea is that it's just like a
quick quick wins so it's fast and you have like a a good basis that you can deal
with and when i find time then i will also extend it a little bit more and then
also an interesting um project that you can watch is that the crypto punx soft
graph that's a grunty from the foundation that works in the cryptocurrency
subgraph and this this one it's not finished yet but when it will be finished it
will be kind of feature complete because it's crypto punks they have like uh
yeah on chain uh on chain marketplace which is between they make it very
interesting to see kind of price developments and everything how we can extend
this across um i will tweet the link to this uh presentation after the talk or
later so you you can then go there and even uh you can comment or ask questions
and i try to answer them in a timely manner

[18:43] but also you you have like these resources and don't need to like tie or
type from your photos yeah that's it from my side if you have any questions i'm
still here um yeah thank you very much for having me and have fun subscribe for
laughing imagine that you can actually have the mappings file followed by pfs
links can you have it do you have that actually followed like if it's an ipv can
you have that follow that and then pull that data into the ground as well um
yeah if it's the problem your eyes is like first uh it's something that we did
not enable on the decentralized network yet but but we are working it with high
pressure that's one of our top priorities okay so this will come strong but but
you can still you can still use it and as a workaround you can deploy on the old
graph explorer host service that's still around the legacy explorer um i can
show you it's actually if you go explorer and then legacy explorer so

[20:03] that was the old interface so this is still working and there you can
still use ipfs um so but with aquifers you need to be careful if it's an ipfs
uri like ipfs uh colon slash slash um it's not easy to parse that so you need to
write um special uh or even if it's https uh dot colon slash slash application
it's then you need to parse the string first which is yeah a little bit at once
if you're in a beginner with assembly screen you just want this right but if you
have just the hash then there's actually like a tool ipfs where you can get it
and then parse the json and then read the json as an object which is very
convenient but again the problem with ipfs is the data availability is not
guaranteed so if you have to hatch and it's around then it's deterministic but
it could be that the fight is not around and that's why it's non-deterministic
which is something that we're researching now how do we handle that from other
questions yes it's interesting to find out what's your experience with ipfs is
it reliable like did you have any problems with that and the second question is
like if ipfs is so good or why people need filecoin

[21:15] like if everything is fine would that one ever create the file um yeah
at the first the our experience with guests are like how can i say yeah the
problem the problem is the reliability that you don't don't know if the file is
around or not and that's a that is a problem so now if you develop the subgraph
and you depend on rtfs files that you upload to ipfs you need to make sure that
it is cleaned to to uh the ipfs node that your indexer is using to retrieve the
file then you are certain that it's there and now with decentralized network
with you with hundreds of indexers currently we tell the index a look we provide
for them an ipfs note but again that's the centralized right so it's it's a
workaround so that's the problem but i heard i hear that they are aware of these
problems and then they are thinking about to change the things but i honestly i
don't know the specifics there yeah and uh what about uh are we default yes rv
is also in the pipeline so we know about rv and we see that the nft community is
starting to adopt it and um we are yeah there's kind of

[22:28] it's it's a future that we are working on currently yeah yes what about
swarm i don't know about storm actually if there is something going on but in
general um the graph node is open to integrate with every data source so if
there is a data source there is a good demand for for a data source and we see
uh it makes sense then we are open to integrate it so feel free to reach out or
open an issue on the graph node report that you want to swarm integration and
then we will put it into the group yeah all the questions thank you very much
for your time it was an honor

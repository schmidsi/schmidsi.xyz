---
source: YouTube auto-generated captions
uploaded: 2023-07-16
duration: 1525
---

[00:00] thank you thank you so much I'm surprised that people are here that
early but um I'm here too so let's get it started so my name is Simon I'm a
developer relations engineer at etcher node working for the graph and in this
next 30 minutes we talk about what's next for the graph but before we start we
quickly check like where what is the graph today so in a nutshell the graph is
this we have a mass of data a lot of data on blockchains and the graph kind of
magically brings that in order so that we can then query it and use it isn't
that nice or a little bit more from a technical level initially the idea was
that we have fully decentralized for intense they are from ipfs and people run
their own blockchain notes on their computer so they can interact directly with
the blockchain there's interface called Json RPC but that has a lot of problems
so no nowadays nobody runs a blockchain anymore on their computer or like very
seldom and um also the whole blockchain is incentivized for data of writing
right

[01:12] so we pay the validators some money if you want to write data to the
blockchain but if you want to read data from the blockchain there is no read
incentivization in in the protocol so that leads to the problem that data
reading from the blockchain uh is slow or hard so there is also to Json RPC
interface that is not really made for this it will go a little bit deeper into
that um so now when if the graph we have this thing that the graph sits in
between the block the front end and the blockchain and so called as a data layer
so we say the graph is the data layer for web3 so we have data from the
contracts indexed so that we can quickly serve it via graphql to front-ends or
other data science applications um yeah as I said the data layer of F3 so um
more in a nerd speak talk I would say like before we had this query so with Json
RPC we need to like always send these queries to the endpoint it goes 200
milliseconds and then when we just like do a simple thing like displaying all
tokens that somebody has in their wallet then this and this person has maybe 10
or 20 tokens uh this code takes

[02:27] up to minutes um to to resolve and and I mean nowadays people you know
like after half a second one two three seconds in web three we're a little bit
used of waiting right if you ask uh people leave and think like that doesn't
work so the graph if graphql we can have like one simple query that resolves in
uh 100 to 200 milliseconds and we have boom all the tokens that someone has
until it all works in a decentralized network so as of now or yesterday when I
last updated slides we had like 331 indexes they are individuals across the
world that are there to serve the data that we need in our front-ends and then
there are other participants like the delegators easy way to get in uh to
interact with the graph protocol uh the curators and also more than thousand
subcrafts now deployed to the decentralized graph Network so that's a huge step
um also recently or since since we launched the centralized Network it also
improved on on query performance so we see uh like query success rate is 99.97
it's better than the hosted service the service that we were running

[03:39] uh as a proof of concept before also like the indexes are able to give
quicker responses uh made in latency and average latencies is much better and up
to now we there were like 2.25 million query fees collected on the decentralized
graph Network so we have now this possibility to have truly decentralized apps
or apps right and a lot of projects already migrated to the decentralized
network like from them like premium Sushi swap art blocks um and nftx and and
some more uh so like really like people are seeing the value of the
decentralized network and migrating this and really want to have like this
decentralized uh data stack also um there was the graph protocol initially or
the smart contracts were on uh ethereum layer one obviously a little bit High
Gap fees and now there is the scaling to L2 to arbitrum 1 in progress um and
just recently the indexing rewards are enabled in arbitrum one so uh some of the
sub graphs and indexes are now on orbits from one the whole

[04:51] protocol is cross chain so it communicates with each other very
interesting for those that want to see into this all open source and documented
uh if you are into this cross chain protocol Communications uh check it out and
on the decentralized network there are also like seven chains diagnosis arbitrum
polygon Avalanche sailor Phantom ethereum mainnet and and more to come right um
so that's that's really happening right now so this is the point like there's a
decentralized network the graph has a crucial stack in a in-depth um but what's
next so the graph has a big r d team and it is mainly in these five different
research area so it's data and apis indexer experience protocol Network and
operations a snark force a dedicated snark research team and then the protocol
economics and these research areas are kind of these six teams or core deaths
working on these research areas so we have Azure node the one that I work for
then we have streaming fast the substream and fire host which we jump into this
graph Ops indexer tooling

[06:06] um and semiotic is this research group that is cryptography and um and
blockchain research group then the guild front-end open source ogs and then
Missouri as the ones that creating the high quality subclass they jump into all
of them quickly um and then also like the the how the graph defines success so
the graph Network aims to have like the best quality of service the best course
of service and the best developer experience this is a this is the the roadmap
or like the North Star so let's jump quickly into sub streams the the recent
addition by streaming Force there was a lot of talks about substreams um
recently on on Twitter around from the graph ecosystem but I would like to
quickly explain how this this works so when we look at sub graphs basically we
can talk about or we can see this as etlq so a very software engineering term
quickly explained this like extract transform load and then query extract
currently it's made with Json RPC um with polling so on Json rpsc is a very low
level protocol that is not

[07:18] especially made for the fast data extraction then we have the assembly
script that compiles down the webassembly and we do the transform so the data
that's extracted is transformed in a way that we later can load it into the
database it's a postgres database and then finally query it with graphql so this
is how subgraphs currently work and also a lot of of other index tooling that is
around out there it's usually the same etlq process um now the first component
that was evaluated was the extract part so Json RPC as I said like has some
problems so mainly when we think about the blockchain as a whole um Json RPC in
my opinion is kind of a go there if you pin set then I say like oh I want to
have like this block or I want to have like this transaction I want to see
what's in there um and that's not suitable for fast data extraction as we want
to see today with um uh this this new use case if it's good enough to maybe say
I want to send a transaction I want to see when this transaction was mined but
not really to have like a big analysis of data so that's where actually fire
hose comes in

[08:31] you know and instead of this pin set we just have like this stream of
raw blockchain data that goes directly out from the nodes into flat files fully
typed with um Proto buffers and that we can easily start to parallelize and
stream out so this is the fire hose right the extract part and the fire hose is
Bell tested like it runs on the graphs hosted service where we serve um one to
two billion queries per day currently so the firehouse is really production
ready data extraction fast protocol that if you can use and it's all fully open
source so check it out that the next part that saw that the stream first started
to look at this what do we do now from the fire hose we have this Raw full
stream of blockchain data what do we do with that data we need to refine it
because like there's so much data we only need to have something right let me
say for example I want to see a price a token price how it develops then we only
need exactly the swaps on all the detectors when this token is swapped in order
to have this price feed and that's what substreams basically do it's like taking
the data and refine it with model modules that are that we can run in parallel
and also

[09:43] like increase then the speed and in the end we have like transformed
streams of of data so that um comes up with this comparison so we have on top
the traditional sub graphs and on the bottom uh fire hose and substreams and
what's important here to know is like fire hose and substreams they only are the
extract and transform part and that's also why I like there's a lot of talk
about substreams powered sub graphs because that setup is like we have the fire
hose the sub streams and then that is feeded into a postgres database and we
have the same graphical query interface as with sub graphs so this is already
ongoing the unit swap B3 subgraph is what was rebuilt completely by streaming
fast with substreams and it's already on the decentralized network and uh can be
queried um and that's roughly how it looks like we have um the the full blocks
that come in on the top and then um as I said like if you want to have the price
then we can go in all all the dexes each decks has its own module and in the end
they will all be combined and we end up with like a average price stream and the
cool thing about these modules

[10:56] is they are modular that's why we call it modules right and then we can
use that data that price stream and combine it with openc nft sales and then in
the end we have like this volume per collection and also important to note on
this slide is each color represents a different um author or engineer so like
now we can even start to collaborate more and people can start to work on like
um specialized modules and then in the end combine them together so that's a
very beautiful architecture that that is is rolling out right now so if you want
to try out substreams um there's also uh inform information on the graph on the
graph.com docs we have now substreams um yeah we can paralyze the whole thing
and that's that's a good thing um so through that parallelization we saw up to
100x indexing speed Improvement so for example the unit swap V3 subcraft it
needed roughly two months to sync from from uh yeah when it was deployed to now
and with substreams they were able to do this in 20 hours like

[12:08] without any cache data the cool thing about substance is also like them
sub modules can also be cached so like subsequent the changes don't need to
re-index fully as we had it with subcrafts all right um first I need to drink
and then we talk about the chain data from SRE so mesari is a household name I
would say in in web 3 or in encrypt in general as this business intelligence
company they started early on to bring transparency to the space um and so they
are on a very good mission in that regard the mission Alliance in a way that
they say together with the graph like they then we want to create the
transparency then the data needs to be transparent too and they started to look
at all these different protocols and all the different chains and had these
these metrics right we can all these protocols here we see the The Landing ones
so we can categorize them so we have tvl Revenue deposits withdrawals borrows
repayments liquidations maybe more and there are different data sources out
there so data source a is very good in

[13:21] tvl data source B has a little bit more but it's also less complete and
then we have a data source C that's even like uh has other priorities and then
in the end if you want to combine it we have sometimes still holes in the whole
analysis of data that we want to see but also sometimes conflicting information
so when I have from the same like for for the same metric different data sources
of which one is then true and like interestingly also oftentimes this data
sources for even um uh disagreeing so like the data source a says this number
data source B says this number so what's true and what's TBL actually how can we
bring that and so they set out to to create data sets um that are really unified
across all these different protocols uh that that are open sourcing that we can
use so it's now very easy to compare between these different protocols um these
these metrics um there there are the necessary data apps that that is that we
can see on the messery website and also so we can create these dashboards right
where we can compare

[14:33] different Landing protocols with each other and easily with click and
drop because also on underlying they have all the same graphql interface the
same schema and so we can easily build our own stuff on top like not only only
mesari these subgraphs are open for everybody to query and we can now build our
own dashboards or our own intelligent stuff on top of it um yeah more examples
the similar slide so like as as the same as I said before applies for the
Missouri stuff we have on top the protocol metrics UI or or the usage of the
subgraph uh of the blockchain data then we have the graph with subgraphs in the
middle and on the bottom like the contracts and the blockchain so yeah that's
the the protocol metrics website is is cool it's all powered by by data from the
graph uh check it out it's it's very easy to navigate and see what's going on um
in these different protocols um yes then we have the guild The Guild also joined
as a core Dev team uh The Guild is basically well known in the graphql community
very open source focused um a group of people um that joined the graph to to
Really

[15:46] build the best graphql interfaces and the tooling around to create a
graph and one um one one of these tools I quickly want to see that's the graph
client so the graph client can sit on top of the front and end the graph and and
make it more convenient so for example like having multiple like usually uh a
lot of these steps are deployed on different chains and then they have like
different subgroups that feed into it and with the graph client there is an easy
way to combine this all together and also uh very nice helpers so for example if
you can have live queries or block tracking so we always know like which is the
latest block and cool stuff so when you're if you're a front-end engineer make
sure to check out graph client it's uh it's a very convenient tool um then we
also have the graph Ops so graph Ops is a team that is focused on indexer
tooling um and they have basically made two two uh they're working on two
products the one is the launch pad so the idea is to have like a kubernetes uh
Helm chart or configuration to quickly launch an indexer so that that should be
as easy as possible to become an indexer on the graph Network and then also
graph cost

[16:59] which is um this this idea of a gossip Network between the index so
indexes by itself somehow are competing with each other but also have like
incentives to collaborate with each other so that's where graph course comes in
kind of an idea of that indexes can can be for gossip Network share some
information with each other and it all Builds on vacuum that's that's a costly
protocol I think from ethereum nearby Dev team so very cool but like this image
just Chase like basically graph cost uh sits on top of this giant which is a
basically vacuum um yeah and then one core Dev team it's semiotic they are in in
Los Altos and this is really a focused team that has like these three pillars of
research it's a it's a research team they look into artificial intelligence uh
cryptography and verifiable Computing and then General General software
engineering um so verifiable Computing for the graph is an important topic
because the idea is when I send a query to the graph

[18:11] Network how can I be sure like that the response is actually correct in
order like the end call is basically to have verifiable queries but that needs
to have verifiable Computing actually through the whole stack like from
blockchain extraction to indexing to querying um and uh semiotic is it's really
focused on this so I think the first um yeah the first projects are like
verifiable payments so that's one of the ideas of of having a more security than
gateways pay the indexer that uh that there is less trust and then verifiable
indexing so that that we know like as consumers of the graph Network like okay
the indexing the indexes that index something they they actually saw the right
data um then there is a lot of also snark research to to make these stuff if
more efficient but I have to admit like I'm not very familiar with the
mathematics behind snarks I'm happy that I understand private and public key
cryptography and uh yeah and finally verifiable queries as I said that kind of
like the end boss in this uh in this research category um also it's it's funny
for for those that know a little bit about

[19:23] cryptography research um so they were kind of going around this land of
cryptography and and different um approaches like Starks snarks and quarks and
plonks and then ended up with the homomorphic signatures and there is a talk
from from uh Jackson from Defcon that's more interesting that really goes into
um how they approach a problem and where they stand if you are into this
cryptographic research um also the semiotic works on AI so the one of the AI
components in in the graph is this so-called Auto modeling of indexers so they
they kind of know or find out which is the best price for the for the queries
that I as an indexer should set um and they started with modeling the whole
thing out and I think now it's also starting to roll out the index aesthetic and
the prices Discovery do more or less automatic yeah putting it all together um
so we see that we have the data apis the indexer experience the protocol network
operations snark force and protocol economics then uh these are the

[20:37] the research groups and then we have Network multiple chain support fire
hose substreams graph clients graph craft in natural Launchpad mesari subgraph
scholar payments Auto Agora verifiable queries and so much more so there's so
much going on within the graph it's so excited to work alongside these all super
smart people and in the end um the the goal is like harder better faster
stronger like harder trust guarantees better developer experience faster query
processing and stronger uptime guarantees so I know that was a lot um but like
when you scan this QR code you will end up actually to have these slides they're
public on on the Google slides and then you can like also go through by yourself
maybe later and go through all these topics there are some descriptions in there
in the footnotes for each slide um but yeah feel free to scan the QR code you
can also click on my face on the first slide and get to my Twitter if you want
um but yeah thank you so much for your time and thanks for having me have a
great Sunday yeah

[21:55] so yes we have a question from the audience can we get them out hello
thank you for your talk the graph is amazing project and really I like it very
well uh but so let me start with a short story so first time I tried to use
graph maybe in January and February I used uh our subgraph and after like
struggling after a couple of weeks of struggling I found out that the data is
completely incorrect so their subgraph literally they showed like wrong balances
they didn't include interests etc etc so like uh for instance if I want to use
this the graph data how I can distinguish the like subgraphs that are not
anymore supported from subgraphs which are actually doing very well so yeah
that's a very good question so I would start with the Missouri subclass always
because they are well maintained um basically it's a permissionless system so
everybody can just deploy this upgraph so like the quality assurance is uh it's
not always guaranteed on the decentralized network there is also curation so
subcrafts with higher correction have like higher uh chances

[23:07] of being high quality but I would really start with the missari
subcrafts and and go there um and then to to know if the data is corrected you
get from an indexer on the decent trust Network they all send uh so-called query
actor station in the in the response headers and there are fishermen and you
also can become a fisherman when you think like that response is actually wrong
then there's possibility to open up a dispute against that index or maybe they
get slashed for some part but um tldr go with the Missouri subcrafts does that
answer your question we have another question in the front row uh thank you
Simon for your speech uh it was amazing to hear and see from you on your slides
that's moving towards from the hosted solution to the dry solution actually
improve all those metrics like uptime reliability latency which may be not so
obvious but in case if it's true it's it's amazing however uh probably you know
that some centralized data provider uh also utilize ancient not

[24:21] open source software to run subgraphs as a hosted solution as the right
solution like uh Satsuma or gold sky or chain chain stack so my question what is
uh opinion of ancient not in the graph team regarding all those centralized data
provider either helping your ecosystem or the kind of competing cuisine so I
would say all of these centralized providers like I give them a very good advice
join the decentralized network as an indexer other than that I mean like what we
build is open source and we believe that the decentralized network is the best
choice but um with open source I would also say like in the end people can
choose by themselves what they think is the best solution okay thank you do we
have another question don't be shy guys thank you so much for having me have fun

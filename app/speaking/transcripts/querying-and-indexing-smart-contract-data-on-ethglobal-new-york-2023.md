---
source: YouTube auto-generated captions
uploaded: 2023-09-11
duration: 1701
---

[00:08] and indexing smart contract data on ethereum with the graphs um I start
here really with the basics that is what is actually then the smart contract
anyways um and I have like an interesting uh like an example you can think about
of a smart contract that it has two things basically it has storage like data
and you can think about the storage units more contract as a simple Google
Sheets or Excel sheet where you have some just rows and columns with uh with
data in it when we look at the nft contract that's my main example because it's
such stable in in terms of Technology um you you would have like you know in a
very simple way you have an ID the token ID or um also the nht and then you have
an owner which is in ethereum address and then you might or might not have a
metadata URI and other stuff but but in a nutshell and the nft the e6721
contract defines token ID and an owner so that's that's the data view on it
right

[01:24] um if you wanna so yeah the problem is with which the data is that the
smart contract and the blockchain it it usually holds the state as of now like
the if it is a good tool to to see which who has which nft who owns Which nft
but it is not very good um in in knowing uh who owns the nft before and that's
exactly what's going on here um that's a problem that we don't we don't see um
who owned it before in the smart contract state by itself um in places where the
graph jumps in uh that it actually helps to also find a way into the history of
smart contract and on top of that making the current state actually are also
easier to access so you can think about without the graph it is just this and
with the graphs we have a history but um we will go a little bit deeper the
second thing that the smart contract does um besides uh holding holding state or
date down is um it also has rules how to change that they've done and that's
very important

[02:39] because you don't want like have everybody just changing who owns Which
nft it follows certain rules um which can be encoded in a smart contract and
that's also why it's called smart contract um because it the the data is um yeah
can only be changed according to the rules so let's Define quickly the concept
of a blockchain again um so they basically the eruption is a distributed data
storage um secured by cryptography uh that means that like all the transactions
they are they're in blocks and then the hash is coded onto all all over that
those transactions that makes a block and then the Block it's all always and
link to its pre previous block that makes the whole thing tamper-proof so you
can never change one way um distribute means that it is the blockchain is not
runs not on one server it is basically copied over a thousand or hundred ten
thousand hundred thousand times all across the world that makes it so uh
censorship resistant that you would basically need to shut down every

[03:55] single node that runs the ethereum blockchain on it or whatever
blockchain in order to stop it and that's basically impossible um because we
have not Global jurisdiction where you could enforce such a thing um that makes
it very very interesting but going forward anything goes to blockchain as one
thing we do not care about that it is distributed across all all these machines
so we think of it as a logical uh one unit so that's just the blockchain right
and then the smart contract as I said before is the data and the logic how to
change the data that is stored on blockchain how does it work if you want to
change the data you send a transaction to the blockchain which is then
distributed across all these um copies but um and you you sign it
cryptographically with your with your secret key or your wallet so that um
everybody knows that it's this is electric transaction and um and then the
transactions included on the blockchain we will look at that later on

[05:07] um but there is a problem with the data on the blockchain as I said
before um about the the user interfaces as we initially saw um they want to read
how they want to write to the blockchain and as we saw before this incentive
device so if you send the transaction to the blockchain you pay some gas or you
have to put some gas on top of it and the gas is consumed by by the miners or
now no now now it's the groomstick by the validators and then that's why you pay
and by pinning it for it the whole thing works um but when you want to read from
your blockchain there's no incentivization for anybody to provide you that data
per se not in the protocol um so that's why when you go on either understand you
see a lot of advertisements um which sometimes are also a little bit Shady in
order so that etherscan can fund its own business well the same is is also built
from Alchemy if you if you do a lot of requests to Alchemy or infuro you need to
pay for them um so they're jumping into it but the protocol by itself so the
incentivize reading right that's a big problem

[06:22] going back to the um analogy from before each of these things here is
one transaction and also a bigger problem is with the serum blockchain
especially is that we have all these the smart contracts of depth um that have
stuff on the blockchain and every time someone sends a transaction it just laid
on top of each other so in the end if you wanna if you want to see okay what was
actually going on let's say in and Foundation then you would need to oops then
you would need to go through all these transactions and and pick the ones out
that are according to foundation and that's quite tedious work and it takes a
lot of time um that's not something that you want to have in the front end and
this is awesome uh what we see currently or before the graph that front ends do
this is not really code from a project that I've that that was advising um how
they were trying to get the data out um so for those that don't stand um
JavaScript or typescript that reads as follows

[07:33] um do you get you try to get a contract but all these await methods
especially those that we see here and and these here they all pay 200 to 300
milliseconds to resolve because you always call back to so many some nodes um
which you usually need to pay somehow that the issue that that data and then you
wait and you go through so this code if you are if you own let's say 10 or 20
nfts easily gets 5 to 10 or 20 seconds to load just to show you uh a list of the
tokens that you hold and that this is this is like super inefficient and um yeah
users just move away afterwards to say like whatever I don't have time to wait
20 seconds to put my stuff to resolved um yes and that's actually now we had
like already two um reasons why the graph exists so for for one to get the
historical data but for two also to have a very good access to the data um yeah
on the website you probably know it's indexing protocol so pretty much like your
mypfs

[08:45] there's also support for our beef um near Cosmos and and others so in
the end uh the graph will index all blockchains more soon TM um on those CC
currently one point or one building series per day or even a little bit more
depends um so it is really powering um the a lot of the Decks that we see
currently uni swap is the most famous example that uses but we are also kind of
others like enzyme or audios or n and stable um yeah there are a bunch of them
um yeah and it's not only the host service it's also a centralized indexing
Network protocol so um there are more than 118 Nexus I think currently worldwide
owned by individuals oops um and that means these are independent indexes that
run the thing so it is similar to what we talked about before but if you're more
a blockchain general

[09:57] is that we have a distribute Network um there is this redundancy so if a
subgroup is indexed by uh one indexer are across the world which one goes down
another is still around um it also gives you fast and cheap reliable access to
that data and um yeah the whole mission is that we we go forward to Global open
API of the data that we need um yeah that's very cool and in the end we can now
build truly decentralized apps Sorry that's what we try to to do here so quick
uh into the sub graph so I told you before about sub graphs sub graphs in
general are just a database um a database is the same as you saw before in this
Google Slides just multiple of them so database consists of mod cables and you
can Define the tables as As You Wish um then you have the mappings which is hit
this gear here but that's the logic of how to get data out of the blockchain
into that database and in the end you you make it available so and to subgraph

[11:10] by itself only um subgraph by itself is only the code that defines how
this is done but it doesn't do it necessary by itself the indexes they need to
index the top graphs which by indexing that means they create a database and
they run the code how to fill that database so um yeah let's quickly content
with a subgroup so what happens is that we saw this mess of transactions that
are just there and talks each other that they are um created like very nice neat
buckets for for each of the protocol in the database per each protocol so we can
we can easily query the data and make much more sense about what's going on um
that uh in the end we end up with uh to to go back to the screenshot from before
and we have a very nice and neat graphql query so we send one query that has uh
has a round trip of 100 to 300 milliseconds usually uh it's much quicker that's
what we expect um yeah to get the data out all right

[12:24] um I was just reading the chat so I will also share with you the
presentation afterwards like all my presentations are open uh you can you can
use them even if you want to use that presentation to someone maybe you want to
remove the actual node logo then but uh yeah it's public goods um so we end up
with this uh modern web architecture where we have the user interface on top and
then the blockchain on the one that we knew already are in between is this
indexing protocol that is incentivized and built for data reading and that it
sits in between and reads data from the blockchain and stores in in this
indexing layer all right so how does this look like then or how can you think
about it this is the um the illustration that we that's the official one how the
graph node works so again on top we said that adapt can be like in his purest
sense adapt is H it's just HTML CSS and JavaScript um that defines that app it
could be also other programming language but that's all you currently see

[13:37] um I actually talked before when they send transactions to the smart
contracts uh they are changed you can change state so um that is buying nft on
an nft Marketplace or swapping something on unit swap or open LP position
whatever cool thing you can do in the transactions transactions they emit events
um and meet with events smart contract basically tells the outside world what
what happened we can um look into this later what an event is but that basic
basically what what smart contracts admits so you can watch the blockchain or
watch smart contracts for those events and these events are they're interested
into the graph note which will um bandwidth according to those events around
matpay which is uh in a webassembly module and put it put them the stuff into
the store so here's is the database um where where the data is stored or later
retrievable then the other way uh that we had also in in this image from above
is that the depth the

[14:50] depth also needs queries so if you go to UNI swap um at the analytics
page it needs to load data somewhere so it sends queries to the graphical API
which sits on top of the graph node and that graphic API will get data from the
store and then um send it back to the web it's very um very neat right um also a
very funny uh gift that we used to displace this one like um how sub crops work
do you have this mess of uh transactions again and then magically somewhere they
are sorted into this this pocket so that you know what's going on that's I don't
know we'll do all right so now when you think okay it's very cool but uh now how
can we find data tool query the best thing in my opinion is this sub graphs that
XY said from Missouri they are writing very sophisticated subgraphs um okay um
but also send you this thing here in the chat

[16:04] that's Pro currently for me the best entry point I mean you can also go
to the graph oops .com and go here to the graph Explorer and then you see also
the sub graphs here um but the one from like these are the ones that that threat
for Consultants or also something that's already see there are also in the tops
here um but sub graphs here are very good so we can for example say cool um
let's have a look at I know so so they have some on the decent price Network and
some in the hosted service um so you can look through them and and find out that
like okay since then production having 47 or 74.

[17:03] 47 from the development and 100 then damn six deployment cos Y is that
because they deploy to different chains that see it's curves they are usually
the same on all cool um so when you want to look into one of those another good
example actually is uh let's switch to this one it's the crypto bunk subgraph y
and yeah you need to be careful protect one of the high exploration because
somehow a lot of people just deployed sub graphs and outside of a decentralized
network how we now if you want to query that subcraft then you can just go here
and go into the playground and start to play around and if if that's not crowd
but um what I like to do and that's where the where I think it makes sense to
see this Workshop is to actually open up a a very um a little bit more
sophisticated

[18:17] playground although it's a revamp of this one is in the works but I can
show you how this work works so what we do we if you want to query a sub graph
on decentralized network what you need is kind of this is this query URL you can
copy the square go here then you can and go to uh explore like this and and
paste it now the problem with sub graphs on the instant trans network is that
you need to have an API key and that's inside of that URL is playing solder for
the API key and what we first need to find one right so let's do this together
so what you do is you go through um the subgroup studio actually connect the
wallet and I will just create a new account connect and then um sign in

[19:31] and yeah I used to try to to upload some desktop crafts but what's
important for you is that you go to API keys and not subclass and then create a
new API you can click here let's say like a demo and then I can receive free
queries that road is by giving an email that institutional options so I can
claim the queries nice and now I have two a thousand free creators on this APK
that's very good and I already have the API here so I can just copy here go back
go here and paste it oh um just abused everyone I mean like everybody cool um
now what we have here is on the top we have the sub graph and on the bottom we
have um the Explorer and the documentation so the cool thing about graphql is
because it is um where is

[20:48] um strongly typed query language that we see um we can ask explore on
the right so you can also have the docs a graphql query has so called root types
and here we have the root type query a root type subscription all the
subscriptions do not work currently so we go with query now if we go on query
then you see a detailed documentation about what you can query um so in this
example when you look about look at um the crypto plan subgraph uh it has
accounts which are all sorts of punks then we have the actual punks let me just
make the data of the punk and all of this you see there is not this repeating
pattern of accounts and the accounts with s so this is the first one is to get
just one and then you need to provide an ID or you can have many and then you
can have a filter we will look into this and then the result is an account or a
just one account or a list of account same with punks let me see account punks
metadata trades asks and contract and so on so forth like there's lots going on
so now

[22:05] what do we want to do a funny thing to do with the crypto pause actually
is to say I want to know which was actually the most expensive sale ever
happened on Punk and uh you could go to um crypto punks here and clean cool and
I think you can try a lot still so cool they say the largest sale ever happened
is this one five eight two two uh for um eight thousand years always always
funny for me to see like the people actually pay that much money for a pixel but
yeah that's how it is um now we could try to reproduce this one

[23:17] um and that would be cool we go here turn sales and I like this Explorer
we will have soon something like this in well also on the on the graphs.com um
it always looks the same we can say okay what we want to do we can actually
order by the amount of the same and all the directions will make it descending
so that says um it will sort the list of results by amount and the highest
amount to be on the top then we can say okay in which hash it was it happened we
can say which uh ID it is and I want to see also the amount I actually want to
see the transaction hash and then we maybe what I have to from and two and let's
see and see this is for me a very explorative that's why it's called Explorer I
can just um click around here and and read stuff

[24:31] and and trying to figure out what actually what data is this here and
then I can send it cool now let's see um so the highest according to the chakra
uh is actually this one and funny enough when we go back here we see this is 8K
and if this but that's the second one um maybe I should also get all oh yeah
let's just again we can remove this one actually a little bit better View so
five eight to two yes that's what we saw here for 8K but as finding this thing
is that actually the highest sale ever is this one okay good let's interpense
what trouble and

[25:44] let's try again yeah rocker cool and why is why is that what happened
here so when we go to way by the way that usually it's um in underway so what
happened here this is interesting no um Bistro at 8K is the highest sale that's
what they say here but actually um we also see when we look on the blockchain um
that it is uh 124 k e or one Punk um and now you wonder like why is it displayed
here and we can start to do investigations and that's what I think is is the
graph project for and say ah there is this transaction hash you go to either
scan okay and actually new compute so like autocomplete's not there yet and um
and next start to look into the say and what we see here is that um someone uh
uh made a flash loan I think here we see

[26:58] um uh someone got or what is this five hundred million die in a slash
slow down from I think changing abrupt e that's why we end up with this weird
number and then buys Punk and then it gives it gives it all back and sells Punk
again it's supposed to try to uh fake this transaction and we can and
interestingly uh on the official side the sentence orders um but they talk about
it uh in a in an interesting way so we can try to see the punk what's the number
and go here and they can see they say I gave this uh blah blah they are flash
loan and they sends written on their website yeah yeah cool um yeah I think this
explains how to query the graph

---
source: YouTube auto-generated captions
uploaded: 2023-11-04
duration: 1701
---

[00:07] so um quering and indexing SM contract data on ethereum with the graph
um I start here really with the basics um that is what is actually than the
smart contract anyways um and have like an interesting uh like an example you
can think about of a smart contract that it has two things basically it has
storage like data and you can think about the storage in smart contract as a
simple Google Sheets or Excel sheet where you have um just rows and columns with
uh with data in it um when we look at the mft contract it's my uh main example
because it's it's such thinkful in in terms of Technology um you you would have
like in a in a very simple way you have an ID the the token ID of the um of the
nft and then you have an owner which is in ethereum address and then you might
or might not have a metadata URI and other stuff but but in Nell and nft the
es21 contract defines token ID and an owner so that's that's the data

[01:22] view on it right um if you want to yeah the problem is with with the
data is that the smart contract and the blockchain it it usually holds the state
as of now right the it is a good tool to to see which who has which nft who owns
Which nft but it is not very good um in in knowing uh who owns the nft before
and that's exactly what's going on here um that's a problem that we don't we
don't see uh who owned it before in the smart contract state by itself um this
is where the graph jumps in that it actually helps to also find a way into the
history of smart contract and on top of that making the current state actually
also easier to access um so you can think about without the graph it is just
this and with the graph we have a history but um we will go a little bit deeper
the second thing that a smart contract does um besides uh holding holding state
or data is um it also has rules how to change that data

[02:38] and that's very important because you don't want like have everybody
just changing who owns Which nft it it it follows certain rules um which can be
encoded in a smart contract and that's also why it's called smart contract um
because it the the data is um yeah can only be changed according to the rules so
let's define quickly the concept of a blockchain again um so they basically a
block is a distributed data storage um secured by cryptography uh that that
means that like all the transactions they are in they are in blocks and then
hash is coded onto all all over that those transactions that makes a block and
then the Block it's all always um linked to its pre previous block that makes
the whole thing temper proof so you can never change one um distribute means
that it is the blockchain not runs not on one server it is basically copied over
thousand or 100 10,000 100,000 times all across the world that makes it so uh
censorship resistant that you

[03:53] would basically need to shut down every single node that runs the
ethereum blockchain on it or whatever block chain in order to stop it and that
that's basically impossible um because we have not that Global jurisdiction
where you you could en Force such a thing um that makes it very very interesting
but going forward we think of the blockchain as one thing we do not care about
that it is distributed across all all these machines so we we think of it as a
logical uh one unit so that's just the blockchain right and then the smart
contract as I said before is the data and the logic how to change the data that
is stored on blockchain how does it work if you want to change the data you send
a transaction to the blockchain which is then distributed across all these um
copies but um you you sign it cryptographically if your with your secret key or
your wallet so that um everybody knows that this is a thatc transaction and um
then the transactions included on the blockchain we will look

[05:05] at that later on um but there is a problem with the data on the
blockchain as I said before um but the the user interfaces as we initially saw
um they want to read they want to write to the blockchain and as you saw before
it this incentivized so if youve send a transaction to the blockchain you pay
some gas or you have to put some gas on top of it and the gas is consumed by by
the miners or now no now now it's the gr St by the validators and then that's
why you pay and by paying it for it the whole thing works um but when you want
to read from the blockchain there's no incentivization for anybody to provide
you that data per se not in the protocol um so that's why when you go on ether
Chan you see a lot of advertisements um with which sometimes are also a little
bit Shady in order so that ether scan can uh fund its own business or the same
is is also with um Alchemy if you if you do a lot of request to Alchemy or in
fura you need to pay for them um so they're jumping into it but the protocol by
itself

[06:18] incentivize the reading that's a big problem going back to the um
analogy from before each of these things here is one transaction and also a
bigger problem with with etherum blockchain especially is that we have all these
these smart contracts or deps um that have stuff on the blockchain and every
time someone sends a transaction it's just laid on top of each other so in the
end if you want if you want to see okay what was actually going on let's say in
um Foundation then you would need to oops then you would need to go through all
these transactions and and pick the ones out that are according to foundation
and that's quite tedious work and it takes a lot of time um that's not something
that you want to have in the front end and this is also uh what we see currently
or before the graph that front ends do this is really code that from the project
that I um that that I was advising um how they were trying to get the data out
um so for those that understand um JavaScript or

[07:30] typescript that reads as follows um do you get you try to get a contract
but all these aweight methods especially those that we see here and and these
here they all take 200 to 300 milliseconds to resolve because you always call
back to some some node um which you usually need to pay somehow that they gives
you that that data and then you wait and you go through so this code if you are
if you own let's say 10 or 20 nfgs easily gets 5 to 10 or 20 seconds to load
just to show you uh a list of the tokens that you hold and that this is this is
like super inefficient and um yeah users just move away after a while say like
whatever I don't have time to wait 20 seconds put my stuff to resolve um yes and
that's actually now we had like already two um reasons why the graph exists so
for for one to get the historical data but for two also to have a a very good
access to the data um yeah on the website you probably know it's index and
protocol

[08:43] Network like your myfs there's also support for RB um near Cosmos and
and others so in the end uh the graph will index all blockchains more come soon
TM um on those Serv see currently 1 point or 1 billion C per per day uh or even
a little bit more depends um so it is really powering um the a lot of the Decks
that we see currently Unis swap is the most famous example that use this but
also kind of others like enzyme or Odus or M M stable um yeah there are a bunch
of them um yeah and it's not only the host service it's also a eiz indexing
Network protocol so um there are more than 180 indexes I think currently
worldwide owned by individuals oops um and that means these are independent
indexes that that that run with things so it is similar to what we talked about

[09:55] before but etherum or blockchain general is that we have a distribute
Network um there is this redundancy so if a subc is indexed by uh one indexer
all across the world if one goes down other is still around um it also gives you
fast and cheap reliable access to that data and um yeah the whole mission is
that we we we go forward to Global open API of the data that we need um yeah
that's very cool then in the end we can now build truly decentralized hat it's
very that's what we try to to do here so quick re uh into the subph so I've told
you before about subgraphs subgraphs in general are just a database and a
database is the same as you saw before in these Google Slides just multiple of
them so database consists of multiple tables and you can Define the tables as As
You Wish um then you have the mappings which is this gear here but that's a
logic of how to get data out of the blockchain into that database and in the end
you you make it

[11:08] available so and the subgraph by itself only um subgraph by itself is
only uh the code that defines how this is done but it doesn't do it necessarily
by itself the indexes then need to index the subp graph which by indexing that
means they create the database and they run the code how to fill that database
so um yeah that's the quick concept of subgraph so what happens is that we saw
this mess of transactions that are just there on top of each other that they are
um created like very nice NE buckets for for each of the protocol in the
database for each protocol so we can we can easily quer the data and and make
much more sense about what's going on um that uh in the end we end up with uh to
to to go back to the screenshot from before that we have a very nice and neat
graph qu query so we sent one query that has a has a round trip of 100 to 300
milliseconds usually uh it's much quicker that's what we expect um yeah to get
the data

[12:22] out all right um I was just reading the chat so I will also share with
you the presentation afterwards I all my presentations are open uh you can you
can use them even if you want to give the presentation to someone maybe you want
to remove the Ed node logo then but yeah it's public goods um so we end up with
this uh modern dep architecture where we have the user interface on top and then
uh the blockchain on the bottom that we you already have in between is this
indexing protocol that is incentivized and and and build for data reading and
that sits in between and reads data from the blockchain and and stores in in in
this indexing layer all right so how does it look like then or how can you think
about it this is the um illustration that we that's the official one how the
graph not works so again on top is the dab a DA can be like in his purest sense
the dep is H it's just HTML CSS and JavaScript um that defines the app it could
be also other programming language but that's

[13:35] what we currently see um and as we talked before when they send
transactions to the smart contracts they are change you can change state so um
that is buying an nft on nft Marketplace or swapping something on unit swap or
open LP position whatever cool thing you can do all in the transactions
transactions they emit events um and me with events the smart cont track
basically tells the outside world what what what happened we can um look into
this later what an event is but that's basic basically what what smart contracts
admit so you can watch blockchain or watch smart contracts for those events
these events are then in chested into the graph node which will um then with
according to those events run mapping which is uh in best web assembly module
and put it put then the stuff into the store so here is is the database um where
where the data is stored for lat the retrieval then the other way uh that we had
also in in this image from above is that the dep

[14:49] the dep also needs queries so if you go to Unis swap um at the analytics
page it needs to load data somewhere so it says creat to the graphical API which
sits on top of the graph node and that graphical API will get data from the
store and then um send it back to the that it's very um very neat right um also
a very funny uh GI that we used to displace this one like um how sub crops work
we have this mass of uh transactions again and then magically somehow they are
sorted into this this pocket so that you know what's going on that's have an
overv all right so now when you think okay it's very cool but now how can I
actually find data tool query the best thing in my opinion is this sub graphs XY
said from Missori they are writing very sophisticated sub graphs um okay um and
I also so send you this thing here the

[16:03] chat that's Pro currently for me the best entry point I mean you can
also go to the graph oops graphs. and go here to the graph Explorer and then you
see also sub graphs here um but the one from M like these are the ones that dep
thre for theel or also some of meari see also in the tops here um but sub graphs
here are very good so we can for example say cool um let's have a look at know
so so they have some on the decentralized network and some on the hosted service
um so you can look through them and and find out they like hundreds of GRS what
is it okay okay 27 production 47 no 74 47 under development and um six
deployments because why is that because they deploy to different chains have see

[17:17] curve they are usually the same on all cool um so when you want to look
into one of those another good example actually is uh uh let's switch to this
one is the Crypt subr and yeah you you need to be careful to take the one with
the highest coloration because somehow all people just deployed sub GRS that's
outside of a decentralized network um now if you want to query that subcraft
then you can just go here and go into the playground and start to play around um
with with that subc but um what I like to do and that's where the where I think
it makes sense to see this Workshop is actually open up a a very um a little bit
more sophisticated playground although this a revamp of this one is in the works
but I can show you how this work works so what we do if if you want to query a
subgraph on this and drive Network what you need is kind

[18:30] of this is this query URL you can copy this query go here then you can
and go to a um explore like this and and paste it now the problem with subgraphs
on the decentralized network is that you need to have an API key and that's
inside of that URL is PL soer for the API key where we first need to find one
right so let's do this together so what you do is you go to um to the subr
studio actually connect the wallet uh and I will just create a new account and
then um sign in and yeah I used it s to to some desktop CR but what's important
for you is that you go to API keys and not subc and then create a new API key
click here say like

[19:47] demo and then I can receive free queries that will is by giving an email
that are so I claim the queries and now I have two th free queries on this API
key that's very good and I already have the API key here so I can just copy here
go back go here and paste it boom um yeah feel free to just abuse that one I
mean like everybody can have thousand fre cool um now what we have here is on
the top we have the subgraph and on the bottom we have um the Explorer and the
documentation so the cool thing about graph is because it is um very it's um
strongly typed F language that we see um we can have this explore on the right
you can also have the docks graph Quil query has so called root types and here

[21:02] we have the root type query and root type subscription Al the
subscriptions do not work currently so we go with query if you go on query then
you see a a detailed documentation about what you can query um so in this
example when you look about look at um the crypto Punk subgraph uh it has
accounts which are uh holders of punks then we have the actual punks and we have
met dat of the B and all of these you see there is now this repeating pattern of
account and then accounts with s so this is the first one is to get just one and
then you need to provide an ID or you can have many and then you can have a
filter we will look into this and then the result is an account or at just one
account or a list of account same if punks let see account punks metadata trades
asks bits and contract and so on so forth like there Lots going on so now what
do we want to do funny thing to do with the crypto PS actually is to say I want
to know which was actually the most expensive sale ever happened on

[22:18] a punk and uh you could go to um crypto punks noral here okay cool and I
think you can try now L stale so cool they say the largest sale ever happened is
one 5822 uh for um 8,000 e always always funny for me to see that the people
actually pay that much money for a pixel but yeah that's how it is um now we
could tried to reproduce this one um and that would be cool we go here to the
sales and I like this Explorer we will have soon something like this in also on

[23:30] the on the graph. um it always looks the same we can say okay what we
want to do we can actually order by the amount of the sale and Order direction
we make it descending so that says um it will sort the list of result by amount
and the the highest amount to be on the top and then we can say okay we in which
hash it was it happened we can say which ID it is and we want to see also the
amount actually want to see the transaction and then we maybe want to have to
from and two let's see and see this is for me a very explorative that's why it's
also called Explorer I can just um click around here and and and read stuff and
and trying to figure out what act what beta is here and then I can send it cool
now we see um so the highest according to that sakra uh is actually this one and
funny

[24:50] enough when we go back here we see this is 8k and this but that's the
second one um maybe I should also get P out oh let's send this again we can
remove this one a little bit better view so 5822 yes that's what we saw here for
8K but a funny thing is that actually the highest sale ever is this one inter so
and let's s again yeah okay cool and why is why is that what happened here so
when when we go to to way by the way that usually it's um in way so what
happened here this is

[26:05] interesting know um we thought 8K is the highest say and that's what
they say here but actually um we also see when we look on the blockchain um that
it is uh 124k e for one pound um and now you wonder like why is it displayed
here we can start to do investigations and that's what I think is is is the
graph perfect for and say ah there is this transaction hash you go to either
scan have a new compute so like the complete not there yet and um and and con
next start to look into the say and what you see here is that um someone uh did
made a flash loan I think here we see um uh someone got oh what is this five 100
million di in a SL slowdown from I think from K Chang in red e that's why we end
up with this weird number and then buys Punk and then

[27:21] gives it gives it all back and sells Punk again this person tried to uh
f this transaction and we can and interestingly uh on the official side they Sor
this um but they talk about it uh in a in interesting way so we can try to see
the p with the number and go here and see they say I okay this uh blah blah blah
they are flash loan and they s it on their website cool um yeah I think this
explains how to query the graph

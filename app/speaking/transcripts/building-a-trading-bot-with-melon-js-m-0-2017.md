---
source: YouTube auto-generated captions
uploaded: 2017-11-28
duration: 954
---

[00:00] cool um yeah so um this morning we wanted to talk about possibilities to
build a trading board with Milan yes so I walk you through how to do this you
see we built a trading bot so we start with a simple thing you see that's the
market so we have a price and time and somebody places an order overpriced
obviously so it's not interesting then time goes by and our assets in digital
space you know they are really like chomping around so this overpriced order at
some point in time is profitable to take so the simple thing that we want to do
this morning is just take it okay I mean yeah maybe you wanted to have a more
like elaborated strategy to how to exploit decentralized market but I mean I
don't want to go there and tomorrow's talk about how to prevent these
explorations but for us it's all about hacking so we can see the strategy that

[01:15] we had before also kind of reverse liquidity provider so we just take
the orders that are in the market so even if it's bad for the one that um that
filed the order at the beginning we still give him the asset that that he wanted
in the first place so we're not that bad it's not like really an attack so we
had a small motivation to begin with and then I will talk about some challenges
then I go quickly through architecture then we look at some code obviously and
at the end I'm hoping to can show you a nice demo so let's start with the
challenges so we if you start working on a trading boat and then you obviously
get in touch with those nice technologies JavaScript I really like it when three
chairs obviously also truffle also and if your room also and but all of those
they have you know their pitfalls they're not that easy to work with so you have
stuff like this who knows how many whatever it is is it is 3.76 two ether it I
mean that was obviously please be here in you know

[02:29] lesson management should see this but maybe it's also a little bit more
Bitcoin or a little bit less the chicks you you never know up until you you kind
of have an information what this number refers to that's a problem that we
facing every day and be faced and be track baby try to solve it also you know
these contracts addresses I mean I don't know it's hard to get knowing what's
behind maybe one person in the room know what's behind this address maybe more
it's the melon token contract address it was so obviously know and then next
comes are my favorites transaction execution error bad instructions transaction
was not processed in two hundred and forty seconds every day those lovely errors
appear on our screens but if you're not young padawan for this fifth melon J as
Melanie has tries to solve all these issues for you it's here to create a great
so-called developer experience so that it's it's fun again to work with those
technologies and you don't have to scratch your head that much and then and

[03:42] get crazy you know so let's go into architecture as Travis explained
before we have the melon protocol that's basically code that gets compiled down
to byte code in the theorem virtual machine so but we are starting here that
beauty about the theorem virtual machine is that everybody can set up its own
node and interact with lift the smart contracts on the blockchain that's what
you true to through a node but if you're not like liking to to code in zeros and
ones like me and then you need something like we're three touch is that talks to
these two this ECM node and the theorem virtual machine in a in a kind of
convenient way but the problem with web 3 is that it doesn't know about melon
protocol in general so we build on top of f3 like the melon Jas that that helps
you to develop and furthermore the melon doji has obviously knows about the
melon protocol so we can do amazing things like running like precondition so we
can know for example we know in melon

[04:57] doji is if it is allowed to invest in a fund or not we don't need to go
to the blockchain and and and you know waste some gas for some simple stuff that
we can know before and that's all we do in Manchester kind of make it easier
furthermore we can display then proper error messages so that you see yeah it
was just not allowed because you're not on the whitelist and not something like
transaction execution error on top of that we build our ipfs front end which
will generator present to you we have our liquidity provider you see we eat our
own dog food your trading bot can also be built on top of Milan Trieste and
furthermore you can build your white-label portal to the asset management on on
the mountain protocol how amazing is that you don't even need to like have a big
branding of us if you want to work with us so next step obviously is let's dive
into code so first you need to install manages it's simple so for those who know
about

[06:11] NPM they see it first like this then it gets installed and after while
you're there but let's look actually into code need to start at the top so this
if you want to look at melon tree s you start looking at the file that's called
slash lip slash main Doge is it it kind of lists all our functions that we have
for you and you see stuff like assets you see we have calls that are constant
methods then transactions that are non constant methods that cause gas we have
contracts if you really want to go there and get get kind of an instant of the
contract directly you can do this too and yeah we have two helper functions for
example like processable and to readable that makes these big numbers to
readable stuff and vice versa because you don't go with your your human numbers
to the EVM EVM doesn't understand this it goes to data feeds we have stuff for
data feed management exchange it's more or less the same that you see in the
Malon protocol participation so you see you have all

[07:25] the all the methods all all the stuff you need to interact with the
Malon protocol in nicely named and easy to use methods that you just can fire up
in your own trading BOTS and also some utilities maybe for other developers this
is interesting maybe to look into we have some utilities that help in general
work with if the yeah if the blockchain smoking for example rush it's just
simple utility to say if this transaction is not complete in 30 seconds then I
think it's not it's not meant true because someone transact state just should be
faster and also trace that we will look at later so to give you a little bit an
understanding of how we write code in the front end I want to just jump into
this transfer to function so use flow types so 12 first type analyzes then we
have some imports we follow a kind of functional programming style you heard
from Travis that he's playing around with a fast car you know that's a good
thing especially JavaScript programming

[08:38] can be as functional as possible then we see em yeah simple stuff I mean
even those people in here that cannot code maybe get out of this what's going on
here you know to get the contract we build some arguments together we make
quantity processable then we boost gas and and and and execute this transfer
effectively then we check for a login to in the in the log if they're the
transfer was executed and if yes return it through if no return a false so all
those functions the aim is that there is a simple as possible and as
understandable as possible because programmers are human being - so the next
thing is application of what we see but we've sewn and then this is the trading
boat yeah starts with some imports and then we set up melange is we bring in
instance web 3 then we set up the trace or the Train serezha it's a helper
function that you can use to look into the internals of Nantes so you see how
much gas was calculated and and which

[09:53] was the error and and which was the stepped was fulfilled and where it
was rejected so you can use the trace furthermore the tracer is for us and
utility also to hook the whole logging system into appropriate into a big
logging service like sentry that we use so you can easily have your trading bot
like login to sentry and and you don't need to kind of attach to the console
it's further more important if you work with decentralized front-end or that
that's on different machines because you don't know if there is an error if you
don't have this local mechanisms and then we initialize the Menand ojs so the
trading bots as a talk before it starts simply by sending out some some messages
about how many token we have so that we know maybe it's not funded enough and
then the simple function get or create fun so it creates a font for the address
if needed and then has a kind of every block interaction so what we do is more
or less like on every block we check the current state of the font

[11:09] so we see again what's the balance and what's the share price and then
we check the market and on every block we check the mark we go for all the
active orders we get the market price and we compare these orders and as soon as
we see there is an order that is profitable we take them so we run through all
them wait for them and estimate the full cost in class of cars check if we
should take the order or not and then yeah in the end we just execute it that's
it so you see it's a simple pot and because it's simple I think it is simple to
do one more I think you guys really know better ways to have profitable trading
BOTS and you are really invited to do this with Melander chairs are you you can
go to the github and ya file box issues come us to talk to us on Gator and we
are really happy to help I'm happy to help to see what you try to build if we're
not yes but I know you want to see it for real that's why we going to the demo
so the demo

[12:24] it's more or less this but in real okay so I stopped here so we can a
little bit walk into so you see the the boat starts and he has his own address
then we stand the boat has some ke3 and some melon tokens and ether tokens and
then he has a phone with an address you can look this address up actually then
it waits for the first block so it gets to the block and then we see we have no
ether token yet because investing in the melon fund is through melons and but
109 tokens it's already cool and then it starts and and looks at the orders now
it is a little bit bad because it sees order that would have been profitable but
it has no ether token but yet goes route them if I would like running longer
than it would kind

[13:36] of catch up some some orders to 2 pi either tokens but that we will look
at it because it runs since yesterday night on a server that we can go into the
console the server yeah let's do this one little thing if you want to run your
trading bot on your own machine you need to have your obviously your unlock
parity node running so if you need help if this we have also documentation
online so let's look at our running trading bot so maybe you see here it's
already a share price of one point zero nine six and so on that's good and they
try it it goes through it had there is there is kind of a liquidity provided
placing orders and then trading what is kind of watching for profitable orders
and yeah now then it can take something I think it will spend all its ether
right away yeah yeah that's it that so far the melon Doge is trading bot

[14:49] so the next steps as I saw as I told you before yeah play around with
the melon Doge is we will spin up a new competition soon and there you can
participate with your own pot so I mean maybe you are better with other people
clicking and then you can come to work it up come to our Gator file box open
pool request get involve talk to us we're really interested to hear what you
want to build this mountain don't you ask what you want to build with the mount
protocol and be more than happy to help so and if you want to look at this
presentation at some point it's been on the tray manager has taught and 0.94 to
come that's it thank you very much Thank You Simon

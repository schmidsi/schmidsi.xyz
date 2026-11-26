---
source: YouTube auto-generated captions
uploaded: 2019-02-15
duration: 1070
---

[00:00] I want to draw your attention to one thing it's called the front end so
I would say like at the best system however elaborated and cool it is it's kind
of pointless if nobody uses it right so that's about all people are and now they
say like oh you know we have to see helium thing it's really cool but nobody
uses it but the key to usability and to adoption is actually a front-end that's
usable and that's what I want to show you so um I used to think about fronting
like this you know like there is kind of weird stuff going on in the backend
nobody understands and then just the front end guys they come and make it pretty
and it looks nice kind of this patchwork you thing but I have to say it's not
fair it's not fair it's not like this you know like the small contract
developers and the front end this kind of a different relationship and I want to
show you this I see it more like you know a clock and the clock work so we have
the clock work inside of the clock and it's kind of you know like the most
important part of the clock obviously right I mean we're in Switzerland here
making clock since long but the thing with the

[01:15] clock and the clock work is if you just have the clock work you can do
anything about it you know like you can look at it and be like but um yeah you
don't get the time out of it so you need kind of a case around the clock and if
you have like a really high level clock work and then crazy nice front and like
case around it then you have like a starting product like Rolex is throwing that
everybody wants and pace how much of money just you know like to get the time I
have time on my phone what's the point but you see where I'm going so the agenda
before my talks like the importance of the front and now you know they will do
off the manager interface pretty nice and then goes a little bit technical if
the adaptive DAP architecture that's something we kind of worked on but you see
it actually in all the projects that go in a similar direction and in the end
outlook good let's start with the manager interface evolution back in 2017 we
start with this beauty it was we've meet your as a back-end and

[02:30] play so it was a centralized service although we could make them mr. a
pointer anyways we could make the transaction lift up if meta master there is
this kind of you know it's a guy trust less but not fully what's also
interesting is like the aura book quite clumsy huh now if you imagine like an
aura book with you know liquidity that wouldn't fit in that design anyways I
mean it was a good first start but we realized we need to decentralize so the
next step was fully decentralized so this was the first shot with react
components from semantic UI on style just like you know take them put them
together link them to whatever is there yeah first try it's not exactly pretty
but um you know first needs to be the functionality and then there is the design
important form follows function ok so then that's it so now the the form comes
after a function that we kind of had this quick and dirty CSS night where we
just said ok let's make it almost pretty I think it was for preparation for M 0
right

[03:43] the night before I'm 0 it's right to do it but yeah it looks not bad
already goes in a good direction again but still the order book we kind of
didn't understand liquidity yeah it's still an issue you know ok and then I
think for the melon manager competition last year exactly born last year it's
still the same but the cool thing is it was the first time that actually it was
open for the public so you see it's running on ipfs if it was fully
decentralized we human had our own wallet solution and then I still look okay
and this is funny look at that the transaction confirmation modal super strong
cool denim yeah we decide okay now with more or less get the direction of the of
the functionality near now it's time to actually make a proper design on top of
it so I'm I sat down with my um remarkable tablet and tried out how can I do
wire frames on it so and this is the result yeah the idea is like that the
manager has you know like on one

[04:57] side one blink of eye every important information to do you know like
these trading decisions that give the big money so it goes in this direction so
also we have ten the wireframes for the risk management for the policies yeah
it's maybe not you don't see that much but there are wireframes so akhmad a
Fundy did a great job then kind of using these wireframes and going this
direction this pattern library so we kind of have like these patterns that we
can reuse and and and build the front-end upon and then in summer 2018 there was
the melon Olympiads these two series on the main net you already see matias camp
release impact because he started around ten and started to take over component
after component of the component in a nice refactoring way to to to make it
pretty pretty so even here you see the old book and to order form it's already
next step so i'm yes i stopped here before this because this morning you saw how
the front-end looks right now but now i go more into

[06:09] technical stuff so the adaptive deb architecture so we have the problem
everybody talks about this you know user experience versus decentralization so
um we say okay if you want to have a decentralized system you cannot have like
great user experience because people are used to doesn't that is fast response
all right that's why is the centralized or boo exchanges are still more liquid
than decentralized one and so on and it's also a challenge that we also see and
also we we kind of realized we have different environments so on the one side we
might want to have electron apps distributed but on the other side maybe want to
have like in browser stuff so suddenly goes and we want to still be
decentralized or not maybe in the future there will be mobile stuff inside of
status who knows all this stuff so so the kind of the idea is like km we need an
architecture that can adapt to all of these different environments yeah and that
gives the complexity the last bullet point so here it is it starts here the core
the heart

[07:28] the clockwork of every tab actually are the smart contract so the smart
contracts they are you know like these disable mechanics where it's kind of its
we know what's going on we can be an exactly regulated it's not the connector
just hack it there was no SQL injection or you can't hack it if there are flaws
but we kind of assume that they are they are super safe and also the smart
contracts for themself also they are super hard to interact with and I'm not
blaming the guys for not writing proper code because it's not what they have to
do they have to write secure software and not accessible easy to toggle about
software so it's kind of a different approach that's why we built this whole
melon dot ts around it so we kind of say okay there is a protocol the purpose of
the protocol or the smart contract the purpose is to be secure but we want to
work with it so we need kind of an accessibility layer around this small context
that we kind of just directly have this this case around it and then the
JavaScript API then the data layer comes into play so we kind of say okay that
whole data requirements or that

[08:42] black discs like getting order books getting this data in redeem
whatever all this needs to be abstracted in their own lair because it otherwise
you cannot handle the different environments and the data layer also takes data
from the exchange aggregator which I will go into more deep in a later slide and
then exposes everything through a graph QL interface to the user interface so
you see we kind of combine WebSockets from different order books JSON RPC from
the helium go down to this thing through the data layer to the user interface
and this gives the possibility for these three configurations on the left side
you see that this is our actual electron tap setup that will be the version 1.0
it is so we kind of assume that you run your own node on your computer so did
the outer boxes this is kind of the boundary for computer and then inside you
run the electron and inside electron there is a data layer separated from the
user interface they communicate through a graph QL over IP see secular layers of

[09:57] the user interface never has access to the internet which gives the
possibility so that you cannot actually inject some code in there or even if you
can it kind of call home so the only way is through the data layer which is more
secure and this one communicates with the nodes then we kind of experimented if
these two and I just bring it to you because it could be interesting because we
are just going with this one on the upper right side there is some the same ID
centrist or the hosted one so that this could be your server running the whole
data layer on the server and being able to superfast respond to queries from the
user interface so also the data layer can cache data from the blockchain and
from this decentralized order book and and make fast and immediate responses and
so thousands of user interface could connect to this data layer and have a fast
and experience the cool thing about this setup and actually we ran it for quite
a while is that people can just start using your depth in a performant

[11:13] fashion as they are known from from centralized services and then at
some point they realize oh the decentralization this is the thing that I want to
look into and then they can switch over just download their keys from metamath
go over and then our fully decentralized then there is this in-between thing
that we kind of tried to do on ipfs with the data layer inside the browser with
through what was it service workers this worked but um yeah it is too
complicated doesn't make any sense we have liked bf the food is centralized in
full central so so it's cool so we come to the next talk and actually I'm in the
in the agenda that you had like Sebastian Simpson should present this but he
couldn't make it so I kind of jump in here because he did extremely amazing work
with this exchange aggregator so what it is the exchange aggregator is an NPM
package that everybody who knows how to use NPM can use and aggregate all the
books of

[12:26] different exchanges it also is possible to aggregate centralized
exchange but we we don't talk about this now but for here all these centralized
exchanges so it can take all the orders all order up the sake can't lower the
field order em whatever it is to make order and gives all these events these are
the ballots pulled and come together and them combine it aggregate it the cool
thing is that this is an aggregator it's super um it's self-healing so if
somehow this connection kind of drops this tool realize it waits tries to
reconnect and as soon as the connection say say ok this was my last state can
you bring me the rest bring this in aggregate and put it out so if you ever want
to interact with more than one exchanges think about this and try to use it it's
quite it's quite usable if it's already there you can use it in a terminal or be
integrated in the front end it's super cool yeah you might think how it works
with from the khyber exchanges or the Khyber Graham reserve matches there we
kind of say okay

[13:39] because different quantities and then we get different pies in the kind
of simulating order book like this so I'm watch this Ripple the second rep of on
to draw your attention to is the token math here we have the problem of kind of
two mathematics with tokens so we always had in the first releases of the front
and we had this you know like rounding errors so you kind of then you around the
prize and then you get rounding errors and like why where are they coming from
one of the problem is like the number dot max save integer in JavaScript it's
this number is smaller as one even way so as soon as you I've cope with one if
even 0.001 if it's already like above the mark safe number my JavaScript does is
kind of eco Cena into a floaty number where you have like precision laws and
this kind of gives a head X if you don't know about this so I'm we created this
token math library this is the first problem the second problem is like if you
only look at numbers if you then then you have no context so it's important to
say okay if I can add upon ml n + 1 ml n that gives me 2 mln okay

[14:54] but what if I do add 1 ml n + 1 if what is the outcome it doesn't make
sense mathematically right so I mean maybe you want to know okay yeah maybe
melon in if and 1 if it but but like this it doesn't work and it gets even more
crazy if you try to divide its oken's so uh so this is what token math is about
it's really simple it says there is not just a number it's a quantity and the
quantity is tied to a token and this token also has has a decimal so the bit can
talk or bitcoiners order amount of decimals eight and either 18 village or like
made our heads exploding but so we came up with this mid-fifties library which
you can also use it it's quite simple it's just like add subtract and stuff like
this but also you have these functionalities like you have a token quantity and
the prize in that you can say a token entity times price gives this and so the
ante token times the enterprise and then you see you can do calculation like
this for us it's important for the for the holding so if you ever kind of had
problems with JavaScript have these calculations I'm this library that you could
use so in

[16:11] the end as we saw like this is the front and how it looks like um maybe
yesterday night but yeah there will be still some progress so you will soonish
be able to download it by yourself and have a look so to conclude this
presentation and maybe it is um afternoon I'd like to do a little bit outlook so
as I said we had these wireframes and Achmed I found the did a great job
actually you know like bringing this to life if mock-ups like this and this
mock-up is still around and the front end doesn't look like this yet but I think
that's the direction to go and hopefully we see this happening soon also as a
kind of picked in most of the designs actually were made mobile ready so for us
we have the designs mobile ready they're around just needs to be implemented on
mobile yeah and then to the end in this year we kind of also worked on the
solution how to create reports and for these blockchain funds

[17:26] and how to then also audit them how can be you know automated these
operations how can we do this but um yeah in the end we kind of um it's not
ready yet so this is just a peek em 2 will give more insights into this so thank
you very much enjoy your lunch thank you so much

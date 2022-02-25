---
title: 'Why I’m learning Rust (and you should too)'
description: 'My thoughts on Rust, learning Rust part 1'
date: 2022-02-25
categories: ['blog', 'rust']
ogImage: ./cover.png
---

I’ve decided to learn Rust after Python and JavaScript. It’s the best low-level language which is super productive, super safe, and super fast.

> Rust is the perfect programming language love-child that combines the power of C++ with the safety of Java or other interpreted languages.
> 

It also introduced me to some new, low-level programming concepts I had never even heard of - in the first 4 chapters itself. 

The 4 main reasons why I already LOVE Rust are :

- Great learning experience
- Amazing community
- It is difficult. Python and JS were too easy
- Because everyone is using Rust - track record is insane

I’ll also show how you can get started with Rust right away at the end of this blog

## The learning (and development) experience

I’m a fast learner, I want things to go as smoothly as possible so I can learn and start making projects right away. Rust comes with so many things out-of-the box, that other languages just don’t

### The package manager

Rust has a built-in package manager called Cargo -  Which is very simple to use because of the simple syntax of TOML (Tom’s Obvious, Minimal Language)

I didn’t have to write build scripts, test scripts, and run scripts like JavaScript, Cargo handles all that by itself. Hell, it also generates documentation for the project using this command

`cargo doc --open`

generates all documentation for the crates used etc.

It also has a lot of crates on [crates.io](https://crates.io)

It’s like the best of NPM and Pypi combined into one, amazing, easy-to-use unit

![https://us-east-1.tixte.net/uploads/nexxel-has.no-friends.xyz/firefox_ZsbrCR1bRr.png](https://us-east-1.tixte.net/uploads/nexxel-has.no-friends.xyz/firefox_ZsbrCR1bRr.png)

### The rust book

The [official rust book](https://doc.rust-lang.org/book/) explains all the concepts of Rust in an amazingly written book that is available online and offline, it goes through everything imaginable and is for complete beginners,  like me.

There are exercises to do after every chapter, is fun to read with pranks, code blocks, Visual diagrams (when explaining ownership for example). There is no need to find and watch a youtube video when the rust book exists!

### The errors!

I can’t believe I’m saying this, but the errors in rust are BEAUTIFUL! I’m not only talking about the runtime and compile errors, but also the editor warnings and stuff make it insanely easy to find and debug

[https://twitter.com/DhravyaShah/status/1496562616164134923?s=20&t=DWs6a6S_reFOLEVVd4cLyg](https://twitter.com/DhravyaShah/status/1496562616164134923?s=20&t=DWs6a6S_reFOLEVVd4cLyg)

I mean, just look at this dude! How can anyone not figure it out with these errors?!

![https://us-east-1.tixte.net/uploads/img.dhravya.dev/M22.png](https://us-east-1.tixte.net/uploads/img.dhravya.dev/M22.png)

Even getting to the point where editor *misses* an error, is insanely difficult. It even finds dead code, and if you still miss the dead code, it will inform you when compiling

![https://us-east-1.tixte.net/uploads/img.dhravya.dev/N23.png](https://us-east-1.tixte.net/uploads/img.dhravya.dev/N23.png)

![https://us-east-1.tixte.net/uploads/img.dhravya.dev/O24.png](https://us-east-1.tixte.net/uploads/img.dhravya.dev/O24.png)

### Everything offline-able

Everything, from the docs, the book, is available offline out-of-the-box.
yes, other languages have it too. but not as much as rust does

I particularly liked it because the internet connection in one of my rooms is low, and i was getting frustrated - until i came to know about this command

```bash
rustup doc --book
```

This opens the offline rust book - how amazing is that! I don’t even need to have an internet connection to learn rust now!

## The community

The rust community is amazing - with some of the smartest and most helpful people I’ve seen. 
I just started learning rust yesterday- and as always, I joined some discord servers so i could be a part of the community. I joined 2 servers - the official one and the community one

[https://discord.gg/rust-lang](https://discord.gg/rust-lang) and [https://discord.gg/rust-lang-community](https://discord.gg/rust-lang-community) 

They explained me how to get started and gave me tips, etc.

They were incredibly helpful when asking for help too, which i really really appreciate

## It’s difficult. but I love it

Rust, honestly, is a difficult language. The concepts of ownerships, enums, smart pointers, etc. I would never be able to learn these things in Python or JavaScript. It is important for me to learn a low-level language to gain the knowledge.
Oh, and did i mention the fact that it is FAST?

I would love to make huge projects in Rust someday. But I’m a complete beginner right now haha

## Dropbox, Facebook, Cloudflare, Discord - everyone is using Rust

It seems like all the major companies are rewriting parts of their software to use Rust.

[this blog has a nice list of all companies, why they use rust etc.](https://serokell.io/blog/rust-companies)

Even [NPM](https://npmjs.org) - The javascript package manager - uses Rust. Its engineering team chose to rewrite their main service in Rust because they saw that the service’s performance would soon be a bottleneck if user growth kept up.

And this is a real problem, one day, we will be unable to make better hardware, and so software will have to make the cut - Here’s a video explaining Facebook’s use case

[https://youtu.be/kylqq8pEgRs](https://youtu.be/kylqq8pEgRs)

# Rust is insane.

TL;DR of this blog is that rust is insane and you should start learning it too.

### This is how to get started

I’m no expert in this, i just started like 3 days ago, so here’s what *I did*

How I got started with Rust - My friends - CloudedQuartz (who introduced me to Rust and spreads propaganda about it in our discord server) and nexxel (who informed me that he has started learning Rust so I was peer-pressured into it) helped me start.

I recommend joining [Our Discord server - The Coding Horizon](https://discord.io/code) to get such a peer-pressure and motivation, and join the official discord servers i mentioned earlier for advanced help and really smart people

*Just start now* is my (pretty weird) way of starting, this is how I started learning Python, Javascript and React -  I don’t think about it much. it’s a 10-minute difference between deciding to learn and writing the first line of code

Also, learn in Public - write blogs, etc.

Follow people on twitter, subreddits on reddit

## Damn, you’re still reading!

Thanks for reading till the end of the blog, you’re one of the 10% people!

Comment your thoughts below ⬇️ ! I loveeee getting comments

I share about my coding journey, interesting tools, websites, projects through my blog. [Subscribe to the newsletter here](https://blog.dhravya.dev) if you would like to get email notifications for my blogs!

Follow me on Twitter!

[https://twitter.com/DhravyaShah/status/1491653615332651011?s=20&t=DWs6a6S_reFOLEVVd4cLyg](https://twitter.com/DhravyaShah/status/1491653615332651011?s=20&t=DWs6a6S_reFOLEVVd4cLyg)
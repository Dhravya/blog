---
title: 'Creating a QR Code CLI with Rust'
description: 'Join me on my journey of learning to make a CLI and make API requests in Rust'
date: 2022-03-02
categories: ['terminal', 'rust']
ogImage: ./og-image.png
---

Rust is difficult. And like any difficult thing, I realized that the best way to learn is by getting my hands dirty and doing *some* project so that I can start learning and creating **useful** things that people can use in their everyday lives

 Since [Saumya,](https://github.com/27saumya)  a good friend of mine was working on an API wrapper for [api.dhravya.me](https://api.dhravya.me), I thought that making a CLI with similar functionality would be a nice idea.

I decided to go only with QR code for now, because I’m just a  beginner at rust, and let’s be honest, no one is *actually* going to use the cli, it’s more of a learning experience.

By the end of this project, I learnt:

- How to make a CLI in Rust (using `clap`)
- How to make API request in rust (using `reqwest` )
- How to deal with Bytes and save to file (using `std::io::Write`)

This is the end product:

![https://us-east-1.tixte.net/uploads/img.dhravya.dev/d39.gif](https://us-east-1.tixte.net/uploads/img.dhravya.dev/d39.gif)

## Starting out

Since I had no idea how to make a cli using Rust, I searched it up and ended up at [https://rust-cli.github.io/book/tutorial](https://rust-cli.github.io/book/tutorial), a really good tutorial. 

Start the project with 

```powershell
cargo new qrcode-cli
```

Added the following dependencies to `Cargo.toml`

```powershell
[dependencies]
clap = { version = "3.0", features = ["derive"] }
reqwest = { version = "^0.10.0", features=["blocking"] }
```

Yeah, I used blocking `reqwest` because I have no idea how the async stuff works in rust yet, so not to get ahead of myself, I just used the blocking version

For cli, I’m using this really useful package called clap - It does all the CLI part for me, all I had to do is define a structure 

Here’s the code for the structure:

```rust
#[derive(Parser, Debug)]
struct Cli {
    #[clap(short = 'd', long = "data")]
    // The information contained by the QR code
    data: String,

    #[clap(short = 'o', long = "output", default_value = ".")]
    #[clap(parse(from_os_str))]
    output: std::path::PathBuf,
}
```

> `std::path::PathBuf` is just a way to store a `String`-like value but for file paths

I learnt that the `#[]` is kinda just like a decorator in python

`#[clap(parse(from_os_str))]` is to tell clap to support file autocomplete in the `-o` output flag

Finally, I defined the main function, and got the args

```rust
fn main() {
    let args = Cli::parse();
```

This provides a really good interface so I can get `args.data` and `args.output` easily

So, the CLI part was done, that was easy, huh. The tutorial made it simple for me. But I had no idea what came next.

First, I used [Hyper](http://hyper.rs) to deal with all the request part, however, I soon realised that all the async stuff will make me crazy if i go without any knowledge, so I switched to `reqwest` - An easier way of doing the same thing

Even in reqwest i used the Blocking feature and not the async part, I’ll switch when I learn how to 

Now, I made a simple API `GET` request and handled any errors that may come

```rust
// Using blocking request
    let res = reqwest::blocking::get(format!("https://api.dhravya.me/qrcode?query={}", args.data).as_str());

    // Check if the request was successful
    if res.is_err() {
        println!("Error: {}", res.err().unwrap());
        return;
    } 
```

Errors are inevitable here, it could be because of my server not responding, or internet issue, or a 500 error, I handled all of them using the `is_err()`  function

So now I had to do the following:

- Make a file in the user-specified `output` directory
- Get the body from the `res` response (as bytes)
- Write the bytes to the `.png` file

I looked into how to make a new file, and came to know that I have to use the standard library `std::fs::File` to create a `qrcode.png`

```rust
// Create a file in the output directory
    let mut file_ = std::fs::File::create(args.output.join("qrcode.png")).unwrap();
```

I added the underscore because i thought it could mess with the standard library. Fortunately, I don’t need that because Rust handles it really well

Now I simply got the response body in bytes, 

I first tries `to_bytes()` but that didn’t seem to work, then I saw the docs and I had to get the `Body` struct from response, but turns out I didn’t need that either.

```rust
// Get the response body in bytes
    let body = res.unwrap().bytes().unwrap();
```

This seemed to work pretty well it basically just checks if res is valid, converts to bytes and checks again.
The unwrap might be unnecessary but meh

and finally, I tried to use `file.write` but again, that didn’t work 💀 fortunately the VS code autocomplete suggested `write_all` so I just used that and it worked perfectly!

```rust
// Save the body to file
    file_.write_all(&body).unwrap();
```

Finally I just printed a line telling them that the qr code has been saved successfully

```rust
println!("QR code saved to {}", args.output.join("qrcode.png").display());
```

## More stuff I want to do with this project

There are some more things I want to do in this project, I’ll list them out here for future me to handle

- Add help for everything
    
    Currently it just uses the help stuff that clap provides out of the box i would like to customise that 
    

- Add more arguments to the CLI
    
    my API provides so many customizations for the QR code (check it out at [dhravya.dev/qrcode](https://dhravya.dev/qrcode)) That could be utilised in this CLI as more args, and taking the input in such a way that it’s easily understandable for the user
    

- Async
    
    I would like this program to be async (probably using `tokio` and `hyper` or `reqwest`). I tried to make it async this time but I didn’t know stuff about future in rust (and the syntax) so I avoided going that route
    
- Publish on [crates.io](http://crates.io) maybe?
    
    I could make this into a full fledged QR wrapper for my API and publish it on [Crates.io](http://Crates.io) for others to use
    

### This project is open source on github.

Leave a ⭐ if you liked the project, and try out the CLI [here](https://github.com/Dhravya/rust-qrcode-cli) 

[https://github.com/Dhravya/rust-qrcode-cli](https://github.com/Dhravya/rust-qrcode-cli)

## Thanks for reading. You made it!

Thanks for reading so far! Not everyone comes here. 

If you liked the blog and would like to know whenever I post one, make sure to subscribe to the newsletter at [newsletter.dhravya.dev](https://newsletter.dhravya.dev).

 And follow me on Twitter, where I try to post interesting stuff every day.

Comment your thoughts and ideas down below! Let’s start a conversation.

Anyways, that’s it. Bye!
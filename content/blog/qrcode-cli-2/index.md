---
title: 'QR code CLI - more params, optimizing, publishing'
description: 'Completing the CLI with more args and publishing it to cargo!'
date: 2022-03-03
categories: ['terminal', 'rust']
ogImage: ./og-image.png
---

In this blog, I’ll write about how I continued developing my QR code CLI project, by the end, I implemented the following features and did the following things:

- Added full functionality for my API - drawing, mask, foreground, background
- Implementing checks for the same
- Publishing on crates.io
- Optimizing (and how i ended up basically rewriting the entire HTTP part)

## More customizability

My API provides for some pretty cool customisation options - like custom drawers, masks, ability to change foreground and background.

After writing the [last blog](https://blog.dhravya.dev/qrcode-cli), the obvious answer to “what’s next? ” was to add all the customisability options to the CLI too, (since it’s basically just making requests to the API)

So, I added some more parameters to the `Cli` `struct` and let clap handle all the things, as usual

```rust
// Drawer to use, should be a value between 1 and 6 (included)
    #[clap(long = "drawer", default_value = "1")]
    drawer: u8,

    // Mask to use, should be a number between 1 and 5 (included)
    #[clap(long = "mask", short = 'm', default_value = "1")]
    mask: u8,

    // A valid color name or color code
    #[clap(long = "foreground", short = 'f', default_value = "black")]
    foreground: String,

    // A valid color name or color code
    #[clap(long = "background", short = 'b', default_value = "white")]
	  background: String,
```

### Checks

Now that the args are in place, I need to parse them and check the values. Because my API only accepts `1-6` for drawer and 1-5 for mask, I just  used `assert!` macro that raises panics

```rust
assert!(
        args.data.len() <= 255,
        "Data must be less than 255 characters"
    );
    assert!(args.mask <= 5, "Mask must be less than 6");
    assert!(args.drawer <= 6, "Drawer number must be between 1 and 6");
```

### URL builder

I also changed how the URL is formatted, it’s like a factory builder that does stuff one by one

```rust
let mut url = format!(
            "https://api.dhravya.me/qrcode?query={}",
            args.data
        );
```

And then an if-else, because the API won’t use the `fg` or `bg` if a mask/drawer  is provided 

```rust
if args.mask != 1 {
        url.push_str(&format!("&mask={}", args.mask));
        url.push_str(&format!("&drawer={}", args.drawer));
        println!("Warning: If mask and drawer are provided, there will be no FG and BG");
    }
    else{
        url.push_str(&format!("&fg={}&bg={}", args.foreground, args.background));
    }
```

That’s it for the URL, now I had to make the actual query to the API

## Pain starts here - Making the query

So I actually managed to do the same using `reqwest`, with basically no change in the source code, however, when I later ran the command `cargo publish` the crate was huge -  it showed like 217 dependencies. 

I’ll skip the code with reqwest because it doesn’t matter anymore, I didn’t end up using it

Then, when I ran `cargo tree` , I realized my mistake - I didn’t know that `reqwest` is actually a simpler wrapper for `hyper` - hence the huge build size - it installed so much more than I needed...

Then, I asked the same problem in the official rust community, here’s their response

![https://us-east-1.tixte.net/uploads/img.dhravya.dev/r53.png](https://us-east-1.tixte.net/uploads/img.dhravya.dev/r53.png)

Upon looking into it, I knew that ureq is exactly what I’m looking for - a lightweight HTTP client, even though it’s just blocking (I was doing blocking requests anyway)

### Requesting and getting data

After looking at the examples, here’s a snippet I wrote for the request itself

```rust
let mut res = ureq::get(
url.as_str()
)
.call()
.unwrap()
```

This is what returns the `Response`, now I need to read it. I did this using the `.into_reader();` function

And then finally, pasted the image data in the `Vec` using `read_to_end`

```rust
// Get the image data
    let mut data = Vec::new();
    res.read_to_end(&mut data).unwrap();
```

### But here’s the catch: API might give an error

I also needed to catch errors - Something I was struggling with, and spent wayyy too much time on...

The solution was so easy. I feel dumb. What I came up with was, to convert the `Vec` into a string, then an `str` object and check if it starts with `{"success":0}` I soon realised that this was redundant, and all I needed was:

```rust
// Check if data is error
    if data.starts_with(b"{\"success\":0,") {
        println!("{}", String::from_utf8(data).unwrap());
        return;
    }
```

And then, the easy part, which we did in the last blog, save it to a flie:

```rust
// Write the image to the file
    let mut file = std::fs::File::create(args.output.join("qrcode.png")).unwrap();
    file.write_all(&data).unwrap();

    println!(
        "QR code saved to {}",
        args.output.join("qrcode.png").display()
    );
```

## Publishing to cargo

In order to make this CLI somewhat useful, and for a good learning experience, I also published the cli on cargo. 

Cargo is amazing. like, It was just ONE command - `cargo publish` that did all the job for me.

So now, YOU can use these command to try out the cli yourself!

```rust
cargo install qrcode-cli
qrcode-cli --help
```

isn’t cargo an amazing tool? It literally has everything out of the box!

## Thanks for reading!

Thanks for reading this blog. By the end of this project, I learnt:

- How to use `assert!` as an easy way to check the args
- To be thoughtful of the dependencies I use, and make sure that it isn’t too much for a simple project
- How to deal with Vecs and Bytes
- How to ~~not be dumb~~ smartly check for errors without redundancy
- How to publish crates on cargo!

And hopefully, you learnt something too! 

If you found my blog useful:

- Follow me on twitter [@dhravyashah](https://twitter.com/dhravyashah)
- Subscribe to my newsletter - [newsletter.dhravya.dev](https://newsletter.dhravya.dev)
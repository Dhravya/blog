---
title: 'Making a README generator in Rust'
description: 'Practicing my Rust skills by making a real-world project thats actually useful for me!'
date: 2022-03-05
categories: ['rust']
ogImage: ./og-image.png
---

After completing the [monkeytype bot](https://github.com/dhravya/typemonkey) project, I had to write a README for it. Like any other programmer, instead of taking 5 minutes to write the readme, I spent the next 2 hours automating the same - in Rust.

I was looking for a good, useful, but easy project to practice and polish my Rust skills, and this was the perfect idea, since it’s so useful for me.

tl:dr of what I have learnt (and you will hopefully learn) through this project:

- How to take inputs
- how to print in colors
- How to parse a lot of text into something useful
- File reading, writing, creating

I made something ACTUALLY useful in Rust! Here’s a quick demo, in which i generated a README in basically just 20 seconds lol

![https://us-east-1.tixte.net/uploads/img.dhravya.dev/l0f1y5zuy0a.gif](https://us-east-1.tixte.net/uploads/img.dhravya.dev/l0f1y5zuy0a.gif)

Jump right into the source code here. Leave a ⭐ if you found it useful

![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=dhravya&repo=readme-generator)
https://github.com/dhravya/readme-generator

## Creating the thing

So basically to make this project, 3 major things need to be done:

- Take input
- Parse the input
- write to file

That’s pretty much it, and doesn’t need much Rust knowledge

I also spiced it up a little bit by making the installation and usage commands automatic

Taking input is the easiest part, literally just `stdin().read_line()` and put it into a string

I also took colored inputs using a module named `colored` which is the only external dependency to this project, where we can color strings by using something like `.blue()` 

```rust
    // Taking inputs from the user
    let mut project_name = String::new();
    println!("{}", "Enter the project name: ".blue());
    stdin()
        .read_line(&mut project_name)
	        .expect("Failed to read line");
```

I just went ahead to take input for all major stuff a README might need and then added a couple checks so that the README isn’t corrupted

```rust
assert!(
        project_name.trim().len() > 0,
        "Project name cannot be empty"
    );
```

## The file factory

Now, all that’s needed to be done is make a `file factory` which is basically a fancy way of saying, parse and write to file

```rust
fn file_factory(
    project_name: String,
    short_description: String,
    .. more stuff
)
```

then I simply made the file and a `String` to store it’s contents, that we can parse and stuff

```rust
    let mut file = std::fs::File::create("README.md").expect("Failed to create file");
    let mut content = String::new();
```

This is all the easy and boring part, just push all the inputs to the string one by one

```rust
    content.push_str("<div align=\"center\">\n");
    content.push_str(format!("<h1 align=\"center\">{}</h1>\n", project_name.trim()).as_str());
```

I also added the Automation to get git repository URL and make the installation commands as per the directory in which README is being run in 

```rust
// Gets the current repository url from git
        let repo_url: Output = std::process::Command::new("git")
            .arg("remote")
            .arg("get-url")
            .arg("origin")
            .output()
            .expect("Failed to get repo url");
```

So in the end it generates a nice 

```rust
git clone https://github.com/Dhravya/readme-generator.git
cd readme-generator
cargo install
```

And also the usage, license, contribution, etc, depending on this:

```rust
// Checks the current folder. If it has Cargo.toml, package.json or requirements.txt, then generate the installation command automatically
        if std::fs::read_to_string("Cargo.toml").is_ok() {
            installation_command.push_str("cargo install");
            use_command = "cargo run";
        } else if std::fs::read_to_string("package.json").is_ok() {
            installation_command.push_str("npm install");
            use_command = "npm start";
        } else if std::fs::read_to_string("requirements.txt").is_ok() {
            installation_command.push_str("pip install -r requirements.txt");
            use_command = "python main.py";
        }
```

And honestly, that’s LITERALLY it! now all that’s left is to dump the content in the file we created earlier

```rust
file.write_all(content.as_bytes())
        .expect("Failed to write to file");
```

## Publishing

After some testing, refinements and stuff, I decided to publish the project on Cargo - and again, it’s remarkably easy to do so

```rust
cargo publish
```

So now, YOU can generate README using this simple tool, by just using two commands

```rust
cargo install readme-generator
readme-generator.exe
```

## Thanks for reading!

Thanks for reading so far into this blog. 
Make sure to comment thoughts, ideas, ANYTHING below, let’s start a conversation!

[Star the repository](https://github.com/Dhravya/readme-generator), [Contribute to this blog](https://github.com/dhravya/blog) and [Follow me on twitter](https://twitter.com/dhravyashah) now!
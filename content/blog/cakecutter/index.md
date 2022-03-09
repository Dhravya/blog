---
title: 'Introducing Cakecutter🍰'
description: 'Start projects quickly from Cakes (templates)'
date: 2022-03-09
categories: ['rust']
external: 'https://dev.to/dhravya/introducing-cakecutter-start-projects-quickly-from-cakes-templates-5adk'
time: 3
ogImage: ./og-image.png
---

Read the article on dev.to [here](https://dev.to/dhravya/introducing-cakecutter-start-projects-quickly-from-cakes-templates-5adk)

After I posted the [create-python-app blog](https://dev.to/dhravya/create-react-app-but-for-python-1fa9), a member of the dev community (@abhinav1217) suggested me to modularize it - so that people can write all sorts of templates and can do all sorts of stuff with it.

This was an amazing idea for me. I started thinking about the implementation right away. Here's what I came up with - [Cakecutter](https://github.com/Dhravya/Cakecutter).

Cakecutter is a utility tool that helps you to create new projects quickly from pre-built cakes - The cakes can be as insane as your imagination, with multiple files, boilerplate code, command runs, etc. (More to be added soon, but I'm not sure what I should add)

All `Cakefiles` (The file that act as templates) are easily shareable and can be made by beginners because of the easy syntax of TOML (tom's obvious, minimal language).

According to the Cakefile, the rust script automatically generates the project for you, almost instantly, and runs any commands in a chronological order. Here's a Demo: 
![Demo](https://us-east-1.tixte.net/uploads/img.dhravya.dev/l0ikgtw4f0a.gif)

(Notice how it initialised venv and ran requirements.txt)

Cakefiles are incredibly easy to configure, here's a simple file that generates a python project (same as create-python-project)
```toml
[filestructure]
root = ['.gitignore', '.env', 'requirements.txt', 'README.md', 'LICENSE']
src = ['main.py']

[content]
src--main-py = """
print("Hello World")
"""

-gitignore = """
target/
.env
venv/
"""

requirements-txt = """requests"""

[commands]
1 = ['python', '-m', 'venv', 'venv']
3 = ['python', 'src/main.py']
```

So you can write multiple cakefiles for yourself (according to your needs, for different languages) and run them every time you start a project. Add a `Cake.toml` file in your github repository to encourage others to use the cakefile and the project as a template!

## Features
- Create projects from pre-built cakes (templates) and make your own!
- Supports all languages (Python, Js, Rust, Go, you name it.)
- Cross-platform
- Super fast ⚡
- Get Cakes from github or use local Cakefiles

### Usage
```
cakecutter [TEMPLATE_NAME]
```
You can also use cakes from github (Provided they have a `Cake.toml` file in the root directory of the repository):
```
cakecutter https://github.com/dhravya/cakecutter
```

I'll add example templates (For python, js, etc. ) soon. Feel free to comment your thoughts below!
- What more can I add?
- What should python, js, rust, etc. templates have?
- Would you use it in your everyday lives?

The project is super duper light ,[a little more than 40 kbs](https://crates.io/crates/cakecutter) so don't worry about that either 
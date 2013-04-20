# dev-docs

The current system of documentation isn't great. The problem isn't necssarily
that the docs aren't well written (they often are) but they can get out of
date very quickly. They are rarely reviewed, rarely updated and in on a whole
I'd say our code is poorly documented.

It is often difficult to get *up to speed* on a existing project. FS's are now
a thing of the past and I'm not sure we have really developed an agile
approach to solve the hole left. This is my solution.

## What's this then?

The structure is simple. The only step is to create a README.md file in the
directory you are working in. This is your docs for the folder. If your in a
high level folder, your documentation should be high level. If you are in some
obscure subdirectory they should be more specific.

    mep
    \- README.md (this would tell us the purpose of the mep folder)
    \- src
       \- core
          \- README.md (specific info about the core plugin)
          \- test
             \- README.md (even more specific info about the tests)

README's are written in Markdown format. Markdown's great, just ask github.
Actually, if you haven't noticed already, a lot of the inspiration for this is
gleaned from the way github documentation is produced. Given that it's one of
the most popular sites on the internet, I don't think this is a bad thing. The
reasons for why it's great are listed at the bottom of this document ;)

## Diagrams!

Amazing! This isn't a part or markdown however. Diagrams are pretty crucial
for us, but getting something that looks good in a text file AND when
'rendered' is difficult. The solution used here hacks the markdown parser to
look for "ascii art", then sends that off to a (local) Ditaa server which
returns a prettier PNG image. It's very easy to quickly draw diagrams with
http://www.asciiflow.com. Check it out below.

//diag//
    +--------------+       +------------------+
    |              |       |                  |
    |   Markdown   +------>|   ASCII Diags    |
    |              |       |                  |
    +--------------+       +---------+--------+
                                     |
                                     v
    +--------------+       +------------------+
    |              |       |                  |
    |     PNG      |<------+      Ditaa       |
    |              |       |                  |
    +--------------+       +------------------+
//diag//

That was drawn from this code:

```
//diag//
    +--------------+       +------------------+
    |              |       |                  |
    |   Markdown   +------>|   ASCII Diags    |
    |              |       |                  |
    +--------------+       +---------+--------+
                                     |
                                     v
    +--------------+       +------------------+
    |              |       |                  |
    |     PNG      |<------+      Ditaa       |
    |              |       |                  |
    +--------------+       +------------------+
//diag//
```
## Why is this better?

* Documentation is part of a code review.
* Developers can document from the command line. vim, emacs, whatever. This is
easy and quick and encourages updates.
* Different levels of documentation are neatly segregated by code heirarchy.
* The documentation is right where it should be - beside the code. Developers
'exploring' the source tree can quickly find out information about what they
are looking at.

## Why Markdown

All this is stolen from a blog, but they aren't wrong:

**It’s fast:** the simple formatting saves a significant amount of time over
hand-crafted HTML tags, and is often faster than using a word processor or
WYSIWYG editor. It speeds up the workflows of writers of all ilk, from
bloggers to novelists.

**It’s clean:** Markdown translates quickly to perfectly-formed HTML. No
missing closing tags, no improperly nested tags, no blocks left without
containers. You also get 100% less cruft than exporting HTML from Microsoft
Word. There’s no styling inline, nothing that will otherwise break a site’s
design or mess with the XSLT formatting for PDF output. In short, it’s
foolproof.

**It’s portable:** your documents are cross-platform by nature. You can edit
them in any text-capable application on any operating system. Transporting
files requires no zipping or archiving, and the filesize is as small as it can
possibly get.

**It’s flexible:** output your documents to a wide array of formats. Convert
to HTML for posting on the web, rich text for sending emails or importing into
a layout program for final arrangement or any number of other proprietary
formats.

**It fits any workflow:** You can make Markdown work with any workflow. It can
speed up just about any writing-related process with very little setup. It can
also be scripted all to hell, if you want, because plain text is the most
flexible of any format known to computer-kind.

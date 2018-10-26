**Gulp Notes**

See https://css-tricks.com/gulp-for-beginners/, for more information on the walkthrough.

**Globbing in Node**
Globs are matching patterns for files that allow you to add more than one file into gulp.src. It's like regular expressions, but specifically for file paths.

When you use a glob, the computer checks file names and paths for the specified pattern. If the pattern exists, then a file is matched.

Most workflows with Gulp tend to only require 4 different globbing patterns:


1. *.scss: The * pattern is a wildcard that matches any pattern in the current directory. In this case, we’re matching any files ending with .scss in the root folder (project).
2. **/*.scss: This is a more extreme version of the * pattern that matches any file ending with .scss in the root folder and any child directories.
3. !not-me.scss: The ! indicates that Gulp should exclude the pattern from its matches, which is useful if you had to exclude a file from a matched pattern. In this case, not-me.scss would be excluded from the match.
4. *.+(scss|sass): The plus + and parentheses () allows Gulp to match multiple patterns, with different patterns separated by the pipe | character. In this case, Gulp will match any file ending with .scss or .sass in the root folder.
**

--Since we know about globbing now, we can replace app/scss/styles.scss with a scss/**/*.scss pattern, which matches any file with a .scss extension in app/scss or a child directory.

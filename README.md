# wtf_wikipedia4reveal
Add a new export formats `RevealJS` to  `wtf_wikipedia` by using `wtf_wikipedia_export` for generating a new export format. The repository `wtf_wikipedia4reveal` aggregates the files for the RevealJS presentation  and generates a ZIP file either as standalone RevealJS presentation of as lean export format using the PanDoc repository. Zipping the generated content is `wtf_wikipedia_export` makes use of `JSZip` and `jszip-utils` to zip different files into an export bundle, if the exported format is aggegrated of more than one file or if the generated file is a zipped file format itself (e.g. like the LibreOffice Writer format  ODT).

Repository is a test repository - see [Wiki2Reveal](https://en.wikiversity.org/wiki/Wiki2Reveal) for further details on project.

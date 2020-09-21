# Contributing to CV Boostifier

First of all - thank you for taking your time to contribute to our project 🙂 
In this file you'll find instructions on how to contibute and develop **new themes** to CV Boostifiter.

## Adding a Theme

In order to add a theme to CV Boostifier, please follow the instructions below.

1. Clone the CV Boostifier repository:
```
git clone https://github.com/outbrain/cv-boostifier.git
```

2. Install all dependencies:
```
npm i
```

3. Create a new branch with the name of your theme. The branch name must have the suffix `-theme`:
```
git checkout -b my-theme
```

4. Go to `src/themes`, and open a new folder with the name of your theme (the name of the folder should be in Pascal case).

5. The new folder should include the following files:

* `{ThemeName}.tsx` - The name of the theme (should be the same as folder's name).
* `{ThemeName}.scss` - A sass file which includes all of the theme's styles.
* `preview.png` - A preview image of your theme (will be used in the editor).
* `manifest.json` - A JSON file that includes some meta data about your theme.

Learn more about each file [below](#required-files-for-a-theme). 

**Note**: If needed, you may add addition files to your folder.

6. Once everything is in place, commit & push changes to the new branch.

7. Create a pull request.

### Required Files For a Theme

#### {ThemeName}.tsx

This is in fact the main component of your theme. It should export a React component with the name of your theme. Here's a basic example:

```
import React, {PropsWithChildren} from 'react';
import {IProfileProps} from '../../models';
import './MyTheme.scss';

export function MyTheme(props: PropsWithChildren<IProfileProps>) {
  return <div className="my-theme"></div>;
}
```

By default, your theme's components receive the user `profile` as a prop, and you may access its data as follows:

```
const {basics, skills, work, education, references, projects, publications, languages} = props.profile;
```

In order to learn more about the data model, please take a look at the `models.ts` file under the `src/` folder (`src/models.ts`).

#### {ThemeName}.scss

This will be the main CSS file of your theme. We expect that all of the styles will be nested under a main class or ID:

```
.my-theme {
  // ...
}
```

**Note**: The name of the main wrapper, should be endded with `-theme`.

#### preview.png

A preview image that will be used in the wizard. Recommended size is **500x500**.

#### manifest.json

The manifest file is important, and the theme won't work without it, as it contains metadata about the theme. This is where you get a credit for your work. Here's an example:

```
{
  "displayName": "My Theme",
  "createdBy": [
    {
      "name": "Daniel Sternlicht",
      "link": "https://github.com/dsternlicht"
    }
  ]
}
```

## FAQ

#### Why CV Boostifier?
Why not?

#### Are there any design limitations on the theme?
No limitations. Try to be as creative as you can, but make sure you don’t violate copyrights.

#### May I create a theme with animated unicorns?
Of course you can! And if you will, we'll be the first in line to adopt it.

#### May I extend / change the functionality of the wizard?
CV Boostifier is an open source project, so yes. But it would be best to open an issue / feature request before you start working on a change.

#### Who can I reach out if I have any questions/concerns about the project?
You may contact either [Daniel Sternlicht](http://danielsternlicht.com) or [Tsachi Shushan](https://www.linkedin.com/in/tsachishushan/) for any questions or concerns.

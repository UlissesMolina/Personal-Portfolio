# Personal Portfolio

My personal portfolio. You can check it out at <a href="https://umolina.com">umolina.com</a>

<img width="1919" height="896" alt="image" src="https://github.com/user-attachments/assets/cfa0e216-48ff-4eb7-8bba-a0446bff886e" />


## Tech stack

- React 19, TypeScript, Vite 7
- Tailwind CSS 3 (Catppuccin palette)


## Project structure

```
src/
  main.tsx              # App mount, global CSS + font imports
  App.tsx               # Router, theme init, page layout
  index.css             # Tailwind layers, animations, theming
  data.ts               # Project/experience data
  components/
    Nav.tsx             # Navigation bar
    ProjectCard.tsx     # Project card with tags and links
    TagList.tsx         # Reusable tag/chip list
    Widgets.tsx         # Theme toggle, accent picker, utilities
  pages/
    HomePage.tsx        # Landing page with hero, experience, projects
    ProjectsPage.tsx    # Full projects listing
    BlogPage.tsx        # Blog page
```

## License

Private — portfolio use.

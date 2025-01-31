# aisi-annotate

- live site: https://aisi-annotate.colin.fun

## requirements
- [x] read document
- [x] select text
- [x] assign labels
- [x] see highlighted text
- [x] remove annotations
- [x] json array of annotations

## stuff used
- runtime: [bun](https://bun.sh/) 
- framework: [nextjs](https://nextjs.org)/[react](https://react.dev/) 
- auth: [clerk](https://clerk.com/)
- db: [prisma](https://www.prisma.io/) + [neon](https://neon.tech/) postgres
- styles: [shadcn](https://ui.shadcn.com/)/[radix-ui](https://www.radix-ui.com/) + [tailwind](https://tailwindcss.com/)
- state: [zustand](https://github.com/pmndrs/zustand) + [jotai](https://jotai.org/) 
- fetching/api: [react-query](https://tanstack.com/query/latest/docs/framework/react/overview) + [trpc](https://trpc.io/)
- editor: [tiptap](https://tiptap.dev/) + [liveblocks](https://liveblocks.io/)
- deployment: [vercel](https://vercel.com/)

## running locally (assumes mac)
- install bun (or use some lesser typescript runner): `curl -fsSL https://bun.sh/install | bash`
- go into repo: `cd aisi-annotate`
- install: `bun install` (this will also generate prisma types via postinstall)
- run: `bun run dev`
- open: http://localhost:3000

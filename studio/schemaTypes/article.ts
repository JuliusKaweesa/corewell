import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article title",
      type: "string",
      validation: rule => rule.required().min(10).max(120),
    }),
    defineField({
      name: "slug",
      title: "Website address",
      description: "Click Generate after entering the title.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: rule => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Workplace Health",
          "For Employers",
          "Golf & Sport",
          "General Health",
          "Back & Spine",
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      options: { list: ["Julius Kaweesa", "Kajwiga Emmanuel", "CoreWell Uganda Clinical Team"] },
      validation: rule => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short introduction",
      description: "This appears on the article card and below the article title.",
      type: "text",
      rows: 4,
      validation: rule => rule.required().min(40).max(320),
    }),
    defineField({
      name: "mainImage",
      title: "Article image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          description: "Describe the image briefly for accessibility.",
          type: "string",
          validation: rule => rule.required(),
        }),
      ],
      validation: rule => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: rule => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Reading time",
      type: "string",
      initialValue: "4 min read",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Section heading", value: "h2" },
            { title: "Small heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [{ name: "href", title: "Web address", type: "url" }],
              },
            ],
          },
        }),
      ],
      validation: rule => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "mainImage" },
  },
  orderings: [
    {
      title: "Publication date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function createCategory(name, callback) {
  prisma.category
    .create({
      data: { name },
    })
    .then(callback)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function createTag(name, callback) {
  prisma.tag
    .create({
      data: { name },
    })
    .then(callback)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function createPost(
  title,
  slug,
  content,
  categoryId,
  tags = [],
  image = null,
  published = false,
  callback
) {
  prisma.post
    .create({
      data: {
        title,
        slug,
        content,
        categoryId,
        tags: {
          connect: tags.map((tagId) => ({ id: tagId })),
        },
        image,
        published,
      },
    })
    .then(callback)
    .catch((error) => {
      //se presente errore,generare uno slug univoco   ripassare questo concetto
      if (error.code === 'P2002' && error.meta?.target === 'Post_slug_key') {
        // aggiunge un timestamp allo slug
        const timestamp = Date.now();
        const newSlug = `${slug}-${timestamp}`;
        return createPost(
          title,
          newSlug,
          content,
          categoryId,
          tags,
          image,
          published,
          callback
        );
      }
      throw error;
    });
}

function getPostBySlug(slug, callback) {
  prisma.post
    .findUnique({
      where: { slug },
      include: {
        category: true,
        tags: true,
      },
    })
    .then(callback)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function getAllPosts(callback) {
  prisma.post
    .findMany({
      include: {
        category: true,
        tags: true,
      },
    })
    .then(callback)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function updatePost(slug, data, callback) {
  prisma.post
    .update({
      where: { slug },
      data: {
        ...data,
        tags: data.tags
          ? {
              connect: data.tags.map((tagId) => ({ id: tagId })),
            }
          : undefined,
      },
    })
    .then(callback)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function deletePost(slug, callback) {
  prisma.post
    .delete({
      where: { slug },
    })
    .then(callback)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// Per vedere la sua funzionalità ho testato personalmente un esempio di utlizzo
createCategory('Sport', (category) => {
  console.log('Category created:', category);

  createTag('Calcio', (tag) => {
    console.log('Tag created:', tag);

    createPost(
      'Vittoria Storica nel Derby della Madonnina',
      'vittoria-storica-nel-derby-della-madonnina',
      "L'AC Milan ha trionfato nel derby contro l'Inter con un risultato di 0-6...",
      category.id,
      [tag.id],
      null,
      false,
      (post) => {
        console.log('Post created:', post);

        getPostBySlug(
          'vittoria-storica-nel-derby-della-madonnina',
          (fetchedPost) => {
            console.log('Fetched Post:', fetchedPost);

            getAllPosts((allPosts) => {
              console.log('All Posts:', allPosts);

              updatePost(
                'vittoria-storica-nel-derby-della-madonnina',
                { title: 'Nuovo Titolo' },
                (updatedPost) => {
                  console.log('Updated Post:', updatedPost);
                }
              );
            });
          }
        );
      }
    );
  });
});

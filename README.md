# PRISMAJS BLOG

Create un nuovo progetto Node.js (senza Express) ed installate la Prisma CLI e il Prisma Client. Successivamente definite i modelli Post, Category e Tag nel file schema.prisma Il Post deve contenere le seguenti proprietà:

- title
- slug (deve essere univoco)
- image (non obbligatoria)
- content
- published (boolean)
- createdAt
- updatedAt

- Mentre per Category e Tag è sufficiente la proprietà name.

Le relazioni fra i modelli:

- Category (one-to-many): Ogni Post deve avere una categoria associata, e una categoria può avere più Post associati.
- Tag (many-to-many): Ogni Post può avere uno o più tag associati, e ogni Tag può avere uno o più Post associati.

Dopo aver definito i modelli, aggiungete le funzioni per creare una Categoria e un Tag ed implementate tutte le operazioni CRUD per il modello Post, ovvero:

- Una funzione che consente di creare un Post.
- Una funzione che permette di leggere un Post usando lo slug.
- Una funzione che restituisce l'elenco di tutti i Post.
- Una funzione che consente di modificare un Post.
- Una funzione che elimina un Post.

### BONUS:

- Crea una funzione che restituisca solo i Post pubblicati.
- Crea una funzione che restituisca solo i Post che contengono una determinata stringa nel contenuto.

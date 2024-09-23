

export async function load({ params }) {
    return {
        post: {
            id: params.postId,
            title: ``,
            post: ``,
            html: "",
        }
    };
}
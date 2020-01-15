<template>
    <div class="post">
            <h3 class="event-title">{{post.eventName}}</h3>
            <p class="event-info">
            <strong>Organization:</strong> {{post.organization}} | <strong>Location:</strong> {{post.location}} | <strong>Date:</strong> {{post.date}} | <strong>Website:</strong> {{post.url}}<br>
            </p>
            <p class="event-datails">{{post.description}}</p>
    </div>
</template>

<script>
export default {
    data: () => ({
        posts: []
    }),
    created: function() {
        try {
        fireDb.collection('posts').get()
            .then(snapshot => {
            if (snapshot.empty) {
                console.log('No posts to display')
            }
            snapshot.forEach(doc => {
                this.posts.push((doc.id, '=>', doc.data()))
            })
            })
        } catch(err) {
        console.log(err)
        }
    }
}
</script>

<style>
    .post h3 {
        font-size: 2rem;
    }
</style>
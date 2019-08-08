<template>
  <iframe
    class="video"
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/4FcKm1dRDfk"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
</template>

<script>
export default {
  metaInfo: {
    title: "Arjun says Howdy!"
  }
};
</script>

<style>
body {
  overflow: hidden;
}

.video {
  width: 100%;
  height: 100vh;
}
</style>

const videos = [...document.querySelectorAll('video[preload="none"]')];

function loadPreview(video) {
  video.preload = "metadata";
  if (video.paused && video.readyState === 0 && video.networkState !== video.NETWORK_LOADING) {
    video.load();
  }
}

// Keep off-screen video metadata requests out of the initial image load.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      loadPreview(target);
      observer.unobserve(target);
    });
  }, { rootMargin: "700px 0px" });
  videos.forEach((video) => observer.observe(video));
} else {
  videos.forEach(loadPreview);
}

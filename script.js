const fetchBtn = document.getElementById("fetchBtn");
const urlInput = document.getElementById("url");
const status = document.getElementById("status");
const result = document.getElementById("result");
const videoUrlEl = document.getElementById("videoUrl");
const downloadLink = document.getElementById("downloadLink");

fetchBtn.addEventListener("click", async () => {
  const url = urlInput.value.trim();
  if (!url) {
    status.textContent = "Please enter a TikTok URL.";
    return;
  }
  status.textContent = "Fetching video info…";
  fetchBtn.disabled = true;
  result.style.display = "none";

  try {
    const resp = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
    const data = await resp.json();
    if (!resp.ok) {
      status.textContent = data.error || "Failed to fetch video.";
    } else {
      status.textContent = "Success — direct video URL found.";
      videoUrlEl.textContent = data.videoUrl;

      // Set download link
      downloadLink.href = data.videoUrl;
      // optional filename
      downloadLink.download = "tiktok_video.mp4";
      result.style.display = "block";
    }
  } catch (err) {
    console.error(err);
    status.textContent = "Network error or server unreachable.";
  } finally {
    fetchBtn.disabled = false;
  }
});

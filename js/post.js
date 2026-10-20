// post.html: URL의 ?slug= 값으로 manifest에서 파일을 찾아 렌더링한다.
(async function () {
  var titleEl = document.getElementById("post-title");
  var metaEl = document.getElementById("post-meta");
  var contentEl = document.getElementById("post-content");
  if (!contentEl) return;

  var slug = new URLSearchParams(window.location.search).get("slug");

  try {
    if (!slug) throw new Error("slug 파라미터가 없습니다.");

    var manifestRes = await fetch("posts/manifest.json");
    var manifest = await manifestRes.json();
    var entry = manifest.find(function (p) {
      return p.slug === slug;
    });
    if (!entry) throw new Error("해당 글을 찾을 수 없습니다.");

    var res = await fetch("posts/" + entry.file);
    if (!res.ok) throw new Error("마크다운 파일을 불러오지 못했습니다.");
    var raw = await res.text();
    var parsed = parseFrontmatter(raw);
    var data = parsed.data;

    document.title = (data.title || slug) + " · My Blog";
    titleEl.textContent = data.title || slug;

    var metaParts = [formatDate(data.date)];
    metaEl.textContent = metaParts.filter(Boolean).join(" · ");

    contentEl.innerHTML = marked.parse(parsed.content);
  } catch (err) {
    console.error(err);
    titleEl.textContent = "글을 불러올 수 없습니다";
    metaEl.textContent = "";
    contentEl.innerHTML =
      '<p class="error-state">' + err.message + "<br>로컬 서버로 열었는지 확인해 주세요.</p>";
  }
})();

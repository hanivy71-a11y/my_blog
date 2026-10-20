// 홈(index.html): posts/manifest.json을 읽어 글 목록을 렌더링한다.
(async function () {
  var listEl = document.getElementById("post-list");
  if (!listEl) return;

  try {
    var manifestRes = await fetch("posts/manifest.json");
    if (!manifestRes.ok) throw new Error("manifest 로드 실패");
    var manifest = await manifestRes.json();

    var posts = await Promise.all(
      manifest.map(async function (entry) {
        var res = await fetch("posts/" + entry.file);
        var raw = await res.text();
        var parsed = parseFrontmatter(raw);
        return {
          slug: entry.slug,
          title: parsed.data.title || entry.slug,
          date: parsed.data.date || "",
          excerpt: parsed.data.excerpt || "",
          tags: parseTags(parsed.data.tags),
        };
      })
    );

    posts.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    if (posts.length === 0) {
      listEl.innerHTML = '<p class="empty-state">아직 작성된 글이 없습니다.</p>';
      return;
    }

    listEl.innerHTML = posts
      .map(function (post) {
        var tagsHtml = post.tags.length
          ? '<div class="post-card__tags">' +
            post.tags
              .map(function (t) {
                return '<span class="tag">' + escapeHtml(t) + "</span>";
              })
              .join("") +
            "</div>"
          : "";

        return (
          '<li class="post-card">' +
          '<h2 class="post-card__title"><a href="post.html?slug=' +
          encodeURIComponent(post.slug) +
          '">' +
          escapeHtml(post.title) +
          "</a></h2>" +
          '<p class="post-card__meta">' +
          formatDate(post.date) +
          "</p>" +
          (post.excerpt
            ? '<p class="post-card__excerpt">' + escapeHtml(post.excerpt) + "</p>"
            : "") +
          tagsHtml +
          "</li>"
        );
      })
      .join("");
  } catch (err) {
    console.error(err);
    listEl.innerHTML =
      '<p class="error-state">글 목록을 불러오지 못했습니다. 로컬 서버(예: <code>npx serve</code>)로 열었는지 확인해 주세요.</p>';
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
})();

// 마크다운 파일 상단의 간단한 frontmatter(--- ... ---)를 파싱한다.
// 지원 형식: key: value (문자열만, 배열은 쉼표로 구분한 태그 전용)
function parseFrontmatter(raw) {
  var match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  var data = {};
  match[1].split("\n").forEach(function (line) {
    var idx = line.indexOf(":");
    if (idx === -1) return;
    var key = line.slice(0, idx).trim();
    var value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    data[key] = value;
  });

  return { data: data, content: match[2] };
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  var d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parseTags(tagsStr) {
  if (!tagsStr) return [];
  return tagsStr
    .split(",")
    .map(function (t) {
      return t.trim();
    })
    .filter(Boolean);
}

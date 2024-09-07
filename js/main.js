var syllabus = {};

async function searchSyllabus() {
  const input = document.getElementById("search").value.toLowerCase();
  const syllabusList = document.getElementById("syllabusList");
  syllabusList.innerHTML = ""; // Xóa kết quả cũ

  // Nếu ô tìm kiếm trống thì dừng lại
  if (input.trim() === "") {
    return;
  }

  // Tìm kiếm trong syllabus
  Object.keys(syllabus).forEach((key) => {
    const subject = syllabus[key];
    const subjectCode = subject.SubjectCode.toLowerCase();
    const subjectName = subject.SubjectName.toLowerCase();

    // Nếu mã môn hoặc tên môn khớp với input
    if (subjectCode.includes(input) || subjectName.includes(input)) {
      const syllabusItem = document.createElement("div");
      const title = `${subject.SubjectCode} - ${subject.SubjectName}`;
      syllabusItem.className = "syllabus-item";
      syllabusItem.title = title;
      syllabusItem.innerHTML = `
          <h2 class="download-title three-dots">${title}</h2>
          <h3 class="download-link">Download (${subject.downloadLinks.length})</h3>
          <ul class="download-list">
            ${subject.downloadLinks
              .map(
                (link, index) =>
                  `<li class="download-item three-dots"><a href="${link}" target="_blank">${link
                    .split("/")
                    .pop()}</a></li>`
              )
              .join("")}
          </ul>
        `;
      syllabusList.appendChild(syllabusItem);
    }
  });
}

// load syllabus
(async () => {
  const url = "https://raw.githubusercontent.com/vietanhdang/FPTSyllabusSearch/master/sys.json";
  const response = await fetch(url);
  syllabus = await response.json();
})();
document.addEventListener("DOMContentLoaded", function () {
    const totalMenus = 6;

    // 첫 번째 콘텐츠만 보여주고 나머지는 숨김
    document.querySelectorAll('.content').forEach((content, index) => {
        content.style.display = index === 0 ? 'block' : 'none';
    });

    // 메뉴 클릭 이벤트 연결
    for (let i = 1; i <= totalMenus; i++) {
        const menu = document.getElementById('menu' + i);
        if (menu) {
            menu.addEventListener('click', () => showContent(i));
        }
    }

    function showContent(menuNumber) {
        for (let i = 1; i <= totalMenus; i++) {
            const content = document.getElementById('content' + i);
            if (content) {
                content.style.display = i === menuNumber ? 'block' : 'none';
            }
        }

        document.querySelectorAll('.ani-navbar-menu').forEach(menu => menu.classList.remove('active'));
        const activeMenu = document.getElementById('menu' + menuNumber);
        if (activeMenu) {
            activeMenu.classList.add('active');
        }
    }



    // 사용자 삭제
    const deleteBtn = document.querySelector('.delete-selected-btn');
    if (deleteBtn) {
        deleteBtn.onclick = function () {
            const checkboxes = document.querySelectorAll('.checklist1 tbody input[type="checkbox"]:checked');
            if (checkboxes.length === 0) {
                alert("사용자를 선택하세요.");
                return;
            }
            checkboxes.forEach(checkbox => {
                const row = checkbox.closest('tr');
                row.remove();
            });
            alert("선택한 사용자가 삭제되었습니다.");
        };
    }

    // 사용자 승격
    document.querySelectorAll(".promote-btn").forEach(button => {
        button.addEventListener("click", function () {
            const userRow = button.closest("tr");
            const userId = userRow.querySelector("td").textContent.trim();
            if (!userId) {
                alert("유저가 없습니다.");
                return;
            }
            userRow.style.backgroundColor = "#d4edda";
            alert("승격 완료 (정적)");
        });
    });

    // 책 삭제
    document.querySelectorAll(".book-delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const bookRow = button.closest("tr");
            const bookIsbn = bookRow.querySelector("td:nth-child(3)").textContent.trim();
            if (!bookIsbn) {
                alert("책을 조회할 수 없습니다.");
                return;
            }
            bookRow.remove();
            alert("책 삭제 완료 (정적)");
        });
    });

    // 기존 답변 복원
    document.querySelectorAll("tr[data-complain-no]").forEach(row => {
        const complainNo = row.getAttribute("data-complain-no");
        const replyBox = row.querySelector(".reply-box");
        const savedReply = localStorage.getItem("reply_" + complainNo);
        if (savedReply) {
            replyBox.innerHTML = `<p class="reply-comment">${savedReply}</p>`;
        }
    });

    // 댓글/답변 작성
    document.querySelectorAll(".comment-trigger").forEach(item => {
        item.addEventListener("click", function () {
            const replyBox = this.closest("td").querySelector(".reply-box");
            const complainNo = this.closest("tr").getAttribute("data-complain-no");
            if (!complainNo) {
                alert("잘못된 데이터입니다.");
                return;
            }

            if (replyBox.querySelector(".reply-input")) {
                replyBox.innerHTML = "";
                return;
            }

            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("reply-input");
            input.placeholder = "답변을 입력하세요...";

            const submitBtn = document.createElement("button");
            submitBtn.textContent = "전송";
            submitBtn.classList.add("submit-reply");

            replyBox.innerHTML = "";
            replyBox.appendChild(input);
            replyBox.appendChild(submitBtn);
            input.focus();

            submitBtn.addEventListener("click", function () {
                const answerText = input.value.trim();
                if (!answerText) {
                    alert("답변을 입력하세요.");
                    return;
                }
                localStorage.setItem("reply_" + complainNo, answerText);
                replyBox.innerHTML = `<p class="reply-comment">${answerText}</p>`;
                alert("답변 등록 완료");
            });
        });
    });

    // 댓글창 바깥 클릭 시 입력창 닫기
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".comment-trigger") && !event.target.closest(".reply-box")) {
            document.querySelectorAll(".reply-box").forEach(box => {
                const row = box.closest("tr");
                const complainNo = row.getAttribute("data-complain-no");
                const savedReply = localStorage.getItem("reply_" + complainNo);
                if (savedReply) {
                    box.innerHTML = `<p class="reply-comment">${savedReply}</p>`;
                } else {
                    box.innerHTML = "";
                }
            });
        }
    });

    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
          datasets: [{ 
              data: [86,114,106,106,107,111,133,221,783,2478],
              label: "Africa",
              borderColor: "#3e95cd",
              fill: false
            }, { 
              data: [282,350,411,502,635,809,947,1402,3700,5267],
              label: "Asia",
              borderColor: "#8e5ea2",
              fill: false
            }, { 
              data: [168,170,178,190,203,276,408,547,675,734],
              label: "Europe",
              borderColor: "#3cba9f",
              fill: false
            }, { 
              data: [40,20,10,16,24,38,74,167,508,784],
              label: "Latin America",
              borderColor: "#e8c3b9",
              fill: false
            }, { 
              data: [6,3,2,2,7,26,82,172,312,433],
              label: "North America",
              borderColor: "#c45850",
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'World population per region (in millions)'
          }
        }
      });
});

    

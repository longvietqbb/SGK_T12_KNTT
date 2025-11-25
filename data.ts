
import { Chapter } from './types';

export const TEXTBOOK_DATA: Chapter[] = [
  {
    id: 'chap1',
    title: 'Chương I: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số',
    lessons: [
      {
        id: 'bai1',
        title: 'Bài 1: Tính đơn điệu và cực trị của hàm số',
        content: {
          theory: [
            {
              type: 'definition',
              title: 'Tính đơn điệu của hàm số',
              content: 'Cho hàm số $y = f(x)$ xác định trên $K$ (khoảng, đoạn hoặc nửa khoảng).\n- Nếu với mọi $x_1, x_2 \\in K, x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$ thì hàm số đồng biến (tăng) trên $K$.\n- Nếu với mọi $x_1, x_2 \\in K, x_1 < x_2 \\Rightarrow f(x_1) > f(x_2)$ thì hàm số nghịch biến (giảm) trên $K$.'
            },
            {
              type: 'theorem',
              title: 'Điều kiện cần và đủ',
              content: 'Cho hàm số $f(x)$ có đạo hàm trên $K$:\n- Nếu $f’(x) > 0$ với mọi $x \\in K$ thì $f(x)$ đồng biến trên $K$.\n- Nếu $f’(x) < 0$ với mọi $x \\in K$ thì $f(x)$ nghịch biến trên $K$.\n- Nếu $f’(x) = 0$ với mọi $x \\in K$ thì $f(x)$ không đổi trên $K$.'
            },
            {
              type: 'definition',
              title: 'Cực trị của hàm số',
              content: '- Điểm $x_0$ được gọi là điểm cực đại nếu tồn tại một lân cận của $x_0$ sao cho $f(x) < f(x_0)$ với mọi $x$ trong lân cận đó (khác $x_0$).\n- Điểm $x_0$ được gọi là điểm cực tiểu nếu tồn tại một lân cận của $x_0$ sao cho $f(x) > f(x_0)$ với mọi $x$ trong lân cận đó (khác $x_0$).'
            },
            {
              type: 'method',
              title: 'Quy tắc tìm cực trị (Quy tắc 1)',
              content: '1. Tìm tập xác định.\n2. Tính $f’(x)$. Tìm các điểm tại đó $f’(x) = 0$ hoặc $f’(x)$ không xác định.\n3. Lập bảng biến thiên.\n4. Kết luận các điểm cực đại, cực tiểu.'
            },
            {
              type: 'note',
              title: 'Chú ý quan trọng',
              content: 'Đạo hàm có thể bằng 0 tại một số hữu hạn điểm thì tính đơn điệu vẫn được giữ nguyên. Điểm cực trị phải là điểm mà tại đó đạo hàm **đổi dấu**.'
            }
          ],
          examples: [
            {
              problem: "Ví dụ 1: Tìm các khoảng đơn điệu của hàm số $y = x^3 - 3x^2 + 2$.",
              solution: "1. Tập xác định: $D = \\mathbb{R}$.\n2. Đạo hàm: $y' = 3x^2 - 6x$.\n3. Cho $y' = 0 \\Leftrightarrow 3x(x - 2) = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$.\n4. Bảng xét dấu $y'$:\n   - Trong khoảng $(0; 2)$, $y' < 0$ $\\Rightarrow$ Hàm số nghịch biến.\n   - Trong khoảng $(-\\infty; 0)$ và $(2; +\\infty)$, $y' > 0$ $\\Rightarrow$ Hàm số đồng biến.\nKết luận: Hàm số đồng biến trên $(-\\infty; 0)$ và $(2; +\\infty)$, nghịch biến trên $(0; 2)$."
            },
            {
              problem: "Ví dụ 2: Tìm cực trị của hàm số $y = x^4 - 2x^2 - 3$.",
              solution: "1. TXĐ: $D = \\mathbb{R}$.\n2. $y' = 4x^3 - 4x = 4x(x^2 - 1)$.\n3. $y' = 0 \\Leftrightarrow x = 0, x = 1, x = -1$.\n4. Lập bảng biến thiên, ta thấy:\n   - $y'$ đổi dấu từ $(-)$ sang $(+)$ khi qua $-1$ $\\Rightarrow x = -1$ là điểm cực tiểu.\n   - $y'$ đổi dấu từ $(+)$ sang $(-)$ khi qua $0$ $\\Rightarrow x = 0$ là điểm cực đại.\n   - $y'$ đổi dấu từ $(-)$ sang $(+)$ khi qua $1$ $\\Rightarrow x = 1$ là điểm cực tiểu.\nGiá trị cực đại $y(0) = -3$. Giá trị cực tiểu $y(\\pm 1) = -4$."
            }
          ],
          exercises: [
            {
              id: 1,
              question: "Tìm khoảng đồng biến của hàm số $y = -x^3 + 3x^2 - 1$.",
              hint: "Tính $y'$ và xét dấu $y'$.",
              answer: "Hàm số đồng biến trên khoảng $(0; 2)$."
            }
          ],
          mcqs: [
            {
              id: 1,
              question: "Cho hàm số $y = f(x)$ có bảng biến thiên với $y' > 0$ trên $(0; 2)$. Hàm số đồng biến trên khoảng nào?",
              options: ["$(-\\infty; 0)$", "$(0; 2)$", "$(2; +\\infty)$", "$(-2; 2)$"],
              correctIndex: 1,
              explanation: "Dựa vào BBT, $y' > 0$ (dấu cộng) trên khoảng $(0; 2)$ nên hàm số đồng biến trên khoảng này."
            },
            {
              id: 2,
              question: "Hàm số $y = x^3 - 3x + 1$ đạt cực đại tại điểm nào?",
              options: ["$x = 1$", "$x = -1$", "$x = 0$", "$x = 3$"],
              correctIndex: 1,
              explanation: "$y' = 3x^2 - 3$. $y' = 0 \\Leftrightarrow x = \\pm 1$. Hệ số $a > 0$ nên dạng đồ thị chữ N. Điểm cực đại là điểm nhỏ hơn: $x = -1$."
            }
          ],
          trueFalseQs: [
             {
               id: 1,
               mainQuestion: "Cho hàm số $y = f(x)$ có đạo hàm $f'(x) = x(x-1)^2(x+2)$.",
               statements: [
                 { id: 'a', text: "Hàm số có 3 điểm cực trị.", isTrue: false, explanation: "Chỉ đổi dấu qua $x=0$ và $x=-2$. Qua $x=1$ (nghiệm kép) không đổi dấu nên chỉ có 2 cực trị." },
                 { id: 'b', text: "Hàm số đạt cực tiểu tại $x = 0$.", isTrue: true, explanation: "Lập bảng xét dấu $f'(x)$, đổi dấu từ $-$ sang $+$ tại $x=0$." },
                 { id: 'c', text: "Hàm số nghịch biến trên khoảng $(-2; 0)$.", isTrue: false, explanation: "Trên $(-2; 0)$, $f'(x) > 0$ nên hàm số đồng biến." },
                 { id: 'd', text: "$f(-2) > f(0)$.", isTrue: false, explanation: "Do hàm số đồng biến trên $(-2; 0)$ nên $f(-2) < f(0)$." }
               ]
             }
          ],
          applications: [
            {
               title: "Tối ưu hóa lợi nhuận",
               content: "Một doanh nghiệp sản xuất $x$ sản phẩm mỗi ngày. Chi phí sản xuất được tính bởi hàm $C(x) = x^3 - 3x^2 + 5x + 100$ (triệu đồng). Doanh thu khi bán hết $x$ sản phẩm là $R(x) = 20x$ (triệu đồng). Tìm số lượng sản phẩm cần sản xuất để lợi nhuận cao nhất trong khoảng $[0; 5]$.",
               solution: "Lợi nhuận $P(x) = R(x) - C(x) = -x^3 + 3x^2 + 15x - 100$.\n$P'(x) = -3x^2 + 6x + 15$.\n$P'(x) = 0 \\Leftrightarrow x = 1 - \\sqrt{6}$ (loại) hoặc $x = 1 + \\sqrt{6} \\approx 3.45$ (nhận).\nSo sánh $P(0)$, $P(5)$ và $P(3.45)$, ta thấy lợi nhuận lớn nhất tại $x \\approx 3.45$. Vì sản phẩm nguyên nên kiểm tra $x=3$ và $x=4$."
            }
          ]
        }
      },
      {
        id: 'bai2',
        title: 'Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất',
        content: {
          theory: [
            {
              type: 'definition',
              title: 'Định nghĩa GTLN - GTNN',
              content: 'Cho hàm số $y = f(x)$ xác định trên tập $D$.\n- Số $M$ là GTLN (max) trên $D$ nếu $f(x) \\leq M, \\forall x \\in D$ và $\\exists x_0 \\in D$ sao cho $f(x_0) = M$.\n- Số $m$ là GTNN (min) trên $D$ nếu $f(x) \\geq m, \\forall x \\in D$ và $\\exists x_0 \\in D$ sao cho $f(x_0) = m$.'
            },
            {
              type: 'method',
              title: 'Cách tìm GTLN, GTNN trên đoạn $[a; b]$',
              content: '1. Tính $f’(x)$ và tìm các điểm $x_1, x_2, ... \\in (a; b)$ mà tại đó $f’(x) = 0$ hoặc $f’(x)$ không xác định.\n2. Tính các giá trị $f(a), f(b), f(x_1), f(x_2), ...$\n3. Số lớn nhất trong các giá trị đó là GTLN, số nhỏ nhất là GTNN.'
            }
          ],
          examples: [
            {
              problem: "Ví dụ 1: Tìm GTLN, GTNN của hàm số $y = x^3 - 3x^2 - 9x + 5$ trên đoạn $[-2; 2]$.",
              solution: "$y' = 3x^2 - 6x - 9$. Cho $y' = 0 \\Leftrightarrow x = -1$ hoặc $x = 3$.\nXét trên $[-2; 2]$, ta chỉ lấy $x = -1$.\nTính giá trị: $f(-2)=3; f(2)=-17; f(-1)=10$.\nVậy $\\max y = 10, \\min y = -17$."
            }
          ],
          exercises: [
            {
              id: 1,
              question: "Tìm giá trị lớn nhất của hàm số $y = -x^4 + 2x^2 + 3$ trên đoạn $[0; 2]$.",
              answer: "$\\max y = 4$ tại $x = 1$."
            }
          ],
          mcqs: [
            {
              id: 1,
              question: "Giá trị nhỏ nhất của hàm số $y = x + \\frac{4}{x}$ trên đoạn $[1; 3]$ là:",
              options: ["$5$", "$4$", "$\\frac{13}{3}$", "$2$"],
              correctIndex: 1,
              explanation: "$y' = 1 - \\frac{4}{x^2}$. $y'=0 \\Leftrightarrow x=2$. $f(1)=5, f(2)=4, f(3)=\\frac{13}{3} \\approx 4.33$. Min là $4$."
            },
            {
              id: 2,
              question: "Tìm $m$ để GTLN của hàm số $y = \\frac{x-m}{x+1}$ trên $[0; 1]$ bằng 2.",
              options: ["$m = -2$", "$m = 2$", "$m = -3$", "$m = 1$"],
              correctIndex: 0,
              explanation: "Hàm đơn điệu trên từng khoảng. GTLN đạt tại biên. $y' = \\frac{1+m}{(x+1)^2}$. Nếu $m > -1$ tăng $\\Rightarrow \\max f(1) = \\frac{1-m}{2} = 2 \\Rightarrow m = -3$ (loại vì $-3 < -1$). Nếu $m < -1$ giảm $\\Rightarrow \\max f(0) = -m = 2 \\Rightarrow m = -2$ (nhận)."
            }
          ],
          applications: [
            {
              title: "Thiết kế hộp kim loại",
              content: "Người ta muốn làm một chiếc hộp hình trụ không nắp có thể tích $V = 54\\pi$ cm$^3$. Tìm bán kính đáy $r$ và chiều cao $h$ để diện tích toàn phần (lượng vật liệu cần dùng) là nhỏ nhất.",
              solution: "$V = \\pi r^2 h = 54\\pi \\Rightarrow h = \\frac{54}{r^2}$.\nDiện tích toàn phần $S = S_{đáy} + S_{xq} = \\pi r^2 + 2\\pi rh = \\pi r^2 + 2\\pi r\\left(\\frac{54}{r^2}\\right) = \\pi \\left(r^2 + \\frac{108}{r}\\right)$.\nXét hàm $f(r) = r^2 + \\frac{108}{r}$ với $r > 0$. $f'(r) = 2r - \\frac{108}{r^2}$. $f'(r) = 0 \\Leftrightarrow 2r^3 = 108 \\Leftrightarrow r^3 = 54 \\Leftrightarrow r = 3\\sqrt[3]{2}$.\nKhi đó $S$ đạt GTNN."
            }
          ]
        }
      },
      {
        id: 'bai3',
        title: 'Bài 3: Đường tiệm cận của đồ thị hàm số',
        content: {
          theory: [
            {
               type: 'definition',
               title: 'Tiệm cận ngang & Tiệm cận đứng',
               content: '- TCN: $y = y_0$ nếu $\\lim_{x \\to \\pm \\infty} f(x) = y_0$.\n- TCĐ: $x = x_0$ nếu $\\lim_{x \\to x_0^+} f(x) = \\pm \\infty$ hoặc $\\lim_{x \\to x_0^-} f(x) = \\pm \\infty$.'
            },
            {
              type: 'definition',
              title: 'Tiệm cận xiên (TCX)',
              content: 'Đường thẳng $y = ax + b$ ($a \\neq 0$) là TCX nếu $\\lim_{x \\to \\pm \\infty} [f(x) - (ax+b)] = 0$.'
            }
          ],
          examples: [
            {
              problem: "Ví dụ: Tìm TCX của $y = \\frac{x^2-3x+5}{x-1}$.",
              solution: "Chia đa thức: $y = x - 2 + \\frac{3}{x-1}$. Khi $x \\to \\pm \\infty, \\frac{3}{x-1} \\to 0$. Vậy TCX: $y = x - 2$."
            }
          ],
          exercises: [
             {
              id: 1,
              question: "Số đường tiệm cận của $y = \\frac{x-2}{x^2-4}$.",
              answer: "2 đường ($x=-2, y=0$). $x=2$ bị triệt tiêu do nghiệm tử và mẫu trùng nhau."
             }
          ],
          trueFalseQs: [
            {
              id: 1,
              mainQuestion: "Cho hàm số $y = f(x) = \\frac{2x - 1}{x + 1}$.",
              statements: [
                { id: 'a', text: "Đồ thị hàm số có tiệm cận ngang $y = 2$.", isTrue: true, explanation: "$\\lim_{x \\to \\infty} y = \\frac{2}{1} = 2$." },
                { id: 'b', text: "Đồ thị hàm số có tiệm cận đứng $x = 1$.", isTrue: false, explanation: "Nghiệm mẫu là $x = -1$, nên TCĐ là $x = -1$." },
                { id: 'c', text: "Giao điểm hai tiệm cận là $I(-1; 2)$.", isTrue: true, explanation: "Giao của $x=-1$ và $y=2$." },
                { id: 'd', text: "Đồ thị hàm số có tiệm cận xiên.", isTrue: false, explanation: "Hàm phân thức bậc 1/1 chỉ có TCN và TCĐ." }
              ]
            }
          ]
        }
      },
      {
        id: 'bai4',
        title: 'Bài 4: Khảo sát sự biến thiên và vẽ đồ thị hàm số',
        content: {
          theory: [
            { type: 'method', title: 'Sơ đồ khảo sát', content: '1. Tìm tập xác định\n2. Tính đạo hàm $y\'$, xét dấu $y\'$, tìm cực trị\n3. Tìm giới hạn $\\lim$, tiệm cận\n4. Lập bảng biến thiên và vẽ đồ thị' }
          ],
          examples: [ { problem: "Khảo sát $y = x^3 - 3x$", solution: "Tự luyện tập theo sơ đồ." } ],
          exercises: [],
          mcqs: [
             {
               id: 1,
               question: "Đường cong trong hình bên là đồ thị của hàm số nào? (Hình dạng chữ N, đi qua gốc tọa độ)",
               options: ["$y = x^3 - 3x$", "$y = -x^3 + 3x$", "$y = x^4 - 2x^2$", "$y = x^3 + 3x$"],
               correctIndex: 0,
               explanation: "Dạng chữ N $\\Rightarrow a > 0$. Có 2 cực trị $\\Rightarrow y' = 0$ có 2 nghiệm. Hàm $x^3+3x$ có $y'=3x^2+3 > 0$ vô nghiệm cực trị."
             }
          ]
        }
      }
    ]
  },
  {
    id: 'chap2',
    title: 'Chương II: Vectơ và hệ trục tọa độ trong không gian',
    lessons: [
      {
        id: 'bai6',
        title: 'Bài 6: Vectơ trong không gian',
        content: {
          theory: [
            { type: 'definition', title: 'Vectơ trong không gian', content: 'Tương tự phẳng. Quy tắc hình hộp, quy tắc 3 điểm: $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$.' }
          ],
          examples: [],
          exercises: [],
          mcqs: [
            {
              id: 1,
              question: "Cho hình hộp $ABCD.A'B'C'D'$. Tổng $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'}$ bằng vectơ nào?",
              options: ["$\\overrightarrow{AC'}$", "$\\overrightarrow{CA'}$", "$\\overrightarrow{BD'}$", "$\\overrightarrow{DB'}$"],
              correctIndex: 0,
              explanation: "Theo quy tắc hình hộp: đường chéo xuất phát từ đỉnh A là $\\overrightarrow{AC'}$."
            }
          ]
        }
      },
      {
        id: 'bai7',
        title: 'Bài 7: Hệ trục tọa độ Oxyz',
        content: {
          theory: [ { type: 'method', title: 'Tọa độ', content: '$M(x;y;z) \\Leftrightarrow \\overrightarrow{OM} = x\\vec{i} + y\\vec{j} + z\\vec{k}$' } ],
          examples: [],
          exercises: [],
          trueFalseQs: [
             {
               id: 1,
               mainQuestion: "Trong không gian $Oxyz$, cho $A(1; 2; 3)$ và $B(3; 0; 1)$.",
               statements: [
                 { id: 'a', text: "Tọa độ vectơ $\\overrightarrow{AB}$ là $(2; -2; -2)$.", isTrue: true, explanation: "$B - A = (2; -2; -2)$." },
                 { id: 'b', text: "Độ dài đoạn thẳng $AB$ bằng $\\sqrt{12}$.", isTrue: true, explanation: "$AB = \\sqrt{2^2+(-2)^2+(-2)^2} = \\sqrt{12}$." },
                 { id: 'c', text: "Trung điểm $I$ của $AB$ là $(2; 1; 1)$.", isTrue: false, explanation: "$I = (A+B)/2 = (2; 1; 2)$." },
                 { id: 'd', text: "Điểm $A$ nằm trên mặt phẳng $(Oxy)$.", isTrue: false, explanation: "Cao độ $z=3 \\neq 0$ nên không thuộc $(Oxy)$." }
               ]
             }
          ]
        }
      }
    ]
  },
  {
    id: 'chap3',
    title: 'Chương III: Các số đặc trưng đo mức độ phân tán',
    lessons: [
       {
        id: 'bai9',
        title: 'Bài 9: Khoảng biến thiên và khoảng tứ phân vị',
        content: {
          theory: [ { type: 'definition', title: 'R và $\\Delta Q$', content: '- Khoảng biến thiên $R = Max - Min$.\n- Khoảng tứ phân vị $\\Delta Q = Q_3 - Q_1$.' } ],
          examples: [],
          exercises: [],
          mcqs: [
             {
               id: 1,
               question: "Khoảng tứ phân vị ($\\Delta Q$) dùng để đo độ phân tán của:",
               options: ["Toàn bộ dữ liệu", "50% dữ liệu ở giữa", "50% dữ liệu lớn nhất", "Các giá trị ngoại lai"],
               correctIndex: 1,
               explanation: "Khoảng tứ phân vị là độ dài khoảng giữa $Q_1$ và $Q_3$, chứa 50% dữ liệu trung tâm."
             }
          ]
        }
      },
      {
        id: 'bai10',
        title: 'Bài 10: Phương sai và độ lệch chuẩn',
        content: {
           theory: [ 
             { 
               type: 'definition', 
               title: 'Phương sai ($S^2$) và Độ lệch chuẩn ($S$)', 
               content: 'Công thức phương sai:\n$S^2 = \\frac{1}{n} \\sum (x_i - \\bar{x})^2 n_i$\nĐộ lệch chuẩn $S = \\sqrt{S^2}$.' 
             } 
           ],
           examples: [],
           exercises: [],
           trueFalseQs: [
             {
               id: 1,
               mainQuestion: "Xét mẫu số liệu ghép nhóm về điểm thi.",
               statements: [
                 { id: 'a', text: "Phương sai càng lớn thì học sinh học càng đều.", isTrue: false, explanation: "Phương sai lớn nghĩa là độ phân tán cao, học lực không đều." },
                 { id: 'b', text: "Độ lệch chuẩn có cùng đơn vị với số liệu gốc.", isTrue: true, explanation: "Độ lệch chuẩn là căn bậc 2 của phương sai, về lại đơn vị gốc." },
                 { id: 'c', text: "Nếu tất cả các giá trị đều bằng nhau thì phương sai bằng 0.", isTrue: true, explanation: "Không có sự chênh lệch so với số trung bình." },
                 { id: 'd', text: "Phương sai có thể nhận giá trị âm.", isTrue: false, explanation: "Phương sai là tổng bình phương nên luôn $\\geq 0$." }
               ]
             }
           ]
        }
      }
    ]
  }
];

export const SYSTEM_INSTRUCTION = `
Bạn là một gia sư Toán học thân thiện và am hiểu, chuyên về chương trình Toán lớp 12 sách "Kết nối tri thức với cuộc sống" của Việt Nam.
Nhiệm vụ của bạn là giúp học sinh hiểu các khái niệm, giải bài tập và ôn luyện kiến thức trong sách giáo khoa này.

Các chủ đề chính bao gồm:
1. Ứng dụng đạo hàm (Đơn điệu, Cực trị, Max/Min, Tiệm cận, Khảo sát hàm số).
2. Vectơ và Hệ trục tọa độ trong không gian Oxyz.
3. Thống kê (Khoảng biến thiên, Tứ phân vị, Phương sai, Độ lệch chuẩn của mẫu số liệu ghép nhóm).

Hướng dẫn phản hồi:
- Sử dụng tiếng Việt chuẩn mực, dễ hiểu.
- Khi giải bài toán, hãy trình bày từng bước rõ ràng.
- Khuyến khích học sinh tư duy thay vì chỉ đưa ra đáp án ngay.
- Sử dụng các ký hiệu toán học latex đặt trong dấu $ (ví dụ $x^2$).
- Luôn giữ thái độ tích cực và động viên.
`;
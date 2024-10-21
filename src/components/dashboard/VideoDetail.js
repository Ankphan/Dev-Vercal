import React, { useState, useRef } from 'react';
import { Box, VStack, Flex, Text, Button, Tabs, TabList, Tab, TabPanel, TabPanels, Input, IconButton, HStack, useToast } from '@chakra-ui/react';
import { FiShare2, FiPenTool, FiCopy, FiSearch } from 'react-icons/fi';
import VideoSummary from './Summary';
import Transcript from './Transcript';
import ChatBot from './Chatbot'

function VideoDetailPage({ video, onBack, onVideoNameChange }) {
    const [videoName, setVideoName] = useState(video.file.name);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [highlightIndex, setHighlightIndex] = useState(0); // Index for search results navigation
    const videoRef = useRef(null); // Ref for the video element
    const [currentTime, setCurrentTime] = useState(0); // Track current time of the video
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true); // Auto-scroll state
    const toast = useToast();

    const transcript = [
        { time: 0.00, speaker: 'Test Speaker', text: 'OK, thì đối với business case ở trong khoản này thì mình sẽ không có chuyên sâu về bất kỳ một cái function nào cả, bất kỳ một cái phong ban nào cả. Ví dụ như các bạn có thi supply chain hay các bạn có thi gọi là finance mà có gặp phải những cái case mà quá là chuyên môn.' },
        { time: 29.00, speaker: 'Test Speaker', text: 'Thì những cái kiến thức ngày hôm nay nó vẫn sẽ giúp một phần nào đó, nhưng quan trọng là các bạn phải có kiến thức chuyên môn khá là vững thì mới có thể giải được những case kia. Thì những case kiểu như vậy sẽ không được dạy ở trong khóa học này.' },
        { time: 47.00, speaker: 'Test Speaker', text: 'Vậy thì đối với agenda ngày hôm nay thì mình sẽ có 4 phần. Đầu tiên mình sẽ cùng nhau tìm hiểu phần cơ bản của bất kỳ một cái business case nào, nó sẽ có những cái phần gì.' },
        { time: 69.00, speaker: 'Test Speaker', text: 'Và cái thứ 2 đấy là mình sẽ đi vào cái phần lý thuyết để tiếp cận và xử lý một business case. Nó bao gồm 4 bước. Thứ nhất đấy là problem definition, thứ 2 là analysis, thứ 3 là synthesis recommendation và thứ 4 là implementation risk management.' },
        { time: 77.00, speaker: 'Test Speaker', text: 'Thứ nhất đấy là problem definition, thứ 2 là analysis, thứ 3 là synthesis recommendation và thứ 4 là implementation risk management. Sau đấy, sau khi mình đã xử lý một cái business case rồi thì mình cần phải biết trình bày cái kết quả này ra như thế nào.' },
        { time: 95.00, speaker: 'Test Speaker', text: 'Lên slide, lên video hay là trình bày bằng miệng thì mình đều phải có những cái phần cơ bản, những cái phần ví dụ như story line, ví dụ như là sự khác biệt giữa cái việc trình bày bằng miệng, trình bày bằng cách văn bản hay trình bày bằng video thì nó khác nhau như thế nào.' },
        { time: 116.00, speaker: 'Test Speaker', text: 'Và cuối cùng thì như bất kỳ một buổi học khác thì mình sẽ có phần Q&A để các bạn đặt câu hỏi. Rồi. Trong buổi học thì nếu như mọi người có câu hỏi gì thì có thể mở mic lên và đặt câu hỏi ra cho anh luôn nhé.' },
        { time: 125.00, speaker: 'Test Speaker', text: 'Trong buổi học thì nếu như mọi người có câu hỏi gì thì có thể mở mic lên và đặt câu hỏi ra cho anh luôn nhé. Vậy thì đối với một cái business case sẽ có 2 phần cơ bản.' },
        { time: 139.00, speaker: 'Test Speaker', text: 'Bất kỳ một business case nào. Phần thứ nhất đấy là phần objective. Objective là gì? Objective là gì? Objective là cái mục đích mà người ta ra cái case đấy cho mọi người.' },
        { time: 151.00, speaker: 'Test Speaker', text: 'Họ viết cái case để ra họ đặt cái vấn đề gì cho mọi người ở trong cái case đó thì nó là objective. Ví dụ như objective là tăng trưởng về market share 25% vào năm 2030 hay là làm thế nào để có thể mở rộng một cái sản phẩm, một cái mạng nào đấy của cái công ty đó.' },
        { time: 167.00, speaker: 'Test Speaker', text: 'Hay là làm thế nào để có thể mở rộng một cái sản phẩm, một cái mạng nào đấy của cái công ty đó. Hay là họ muốn một cái campaign về marketing mới để có thêm người sử dụng mới ở khu vực nào đó trên thế giới.' },
        { time: 195.00, speaker: 'Test Speaker', text: 'Vậy thì objective chính là cái câu hỏi lớn nhất mà mọi người cần phải giải quyết trong bài. Nó có thể sẽ, trong bài người ta có thể sẽ đưa ra những câu hỏi nhỏ hơn. Tuy nhiên đấy chủ yếu là những câu hỏi mà người ta gợi ý để mọi người có thể.' },
        { time: 205.00, speaker: 'Test Speaker', text: 'Tuy nhiên đấy chủ yếu là những câu hỏi mà người ta gợi ý để mọi người có thể khi mọi người trả lời những câu hỏi nhỏ đấy mọi người sẽ bắt đầu dần dần có được câu trả lời cho câu hỏi lớn hơn.' },
        { time: 217.00, speaker: 'Test Speaker', text: 'Cho cái objective này. Chứ không phải là, tuy nhiên đấy là những câu hỏi định hướng. Tuy nhiên là quan trọng nhất của một bài giảng vẫn sẽ phải là giải quyết được cái objective lớn của bài.' },
        { time: 239.00, speaker: 'Test Speaker', text: 'Vậy thì ngoài objective thì đối với các business case thường sẽ có gọi là supporting data. Thường là data được cung cấp bởi đề. Bởi vì các data này sẽ, thường các bạn có hai lý do để cung cấp data cho các bạn.' },
        { time: 265.00, speaker: 'Test Speaker', text: 'Thứ nhất đấy là mang tính định hướng và hỗ trợ. Thứ nhất đấy là mang tính định hướng và hỗ trợ. Bởi vì một vài data mà cần để có thể xử lý được cái objective đấy thì các bạn sẽ rất khó để tìm được.' },
        { time: 284.00, speaker: 'Test Speaker', text: 'Ở những cái nguồn trên mạng hay những cái nguồn mà các bạn có access. Vì thế nên là người ta cho các bạn cái data đấy. Thì đấy gọi là problem related data. Thì đấy gọi là problem related data. Nghĩa là những cái data rất là quan trọng mà người ta đưa cho các bạn.' },
        { time: 292.00, speaker: 'Test Speaker', text: 'Bởi vì nó sẽ giúp ích cho các bạn trong việc xử lý cái vấn đề hay xử lý, giải quyết cái objective mà người ta đang đặt ra. Ngoài ra sẽ có một cái dạng data khác gọi là background data.' },
        { time: 303.00, speaker: 'Test Speaker', text: 'Ngoài ra sẽ có một cái dạng data khác gọi là background data. Thường các bạn sẽ bị khó phân biệt giữa problem related data và background data trong những trường hợp mà hai cái dạng data này hơi giống nhau.' },
        { time: 313.00, speaker: 'Test Speaker', text: 'Trong những trường hợp mà hai cái dạng data này hơi giống nhau. Nhất là khi mà những cái đề thiên về kiểu strategy mà rất là high level. Ví dụ như là thiết lập cái chiến lược phát triển của công ty trong 10 năm tới chẳng hạn.' },
        { time: 327.00, speaker: 'Test Speaker', text: 'Ví dụ như là thiết lập cái chiến lược phát triển của công ty trong 10 năm tới chẳng hạn. Thì khi đấy, những cái thường là background data, ví dụ như là company history, rồi là famous achievement hay là overall business strategy.' },
        { time: 336.00, speaker: 'Test Speaker', text: 'Rồi là famous achievement hay là overall business strategy nó sẽ trở thành một cái problem related data chứ không phải là background data nữa. Vì thế nên là nên dựa vào cái objective của đề bài để phân loại những cái data nào mình cần.' },
        { time: 347.00, speaker: 'Test Speaker', text: 'Vì thế nên là nên dựa vào cái objective của đề bài để phân loại những cái data nào mình cần và những cái data nào mình không cần. Bởi vì nếu như các bạn chăm chăm vào việc đọc những cái data mà nó không có liên quan gì nhiều đến problem,' },
        { time: 355.00, speaker: 'Test Speaker', text: 'Bởi vì nếu như các bạn chăm chăm vào việc đọc những cái data mà nó không có liên quan gì nhiều đến problem, thì các bạn sẽ rất dễ bị mất thời gian. Và đây là lý do tại sao mà thường các bạn sẽ gặp khăn sát lớn khi mà đề có nhiều data.' },
        { time: 371.00, speaker: 'Test Speaker', text: 'Vậy thì cái cách mà các bạn tiếp cận một cái business case này thì nó như thế nào? Vậy thì khi mà các bạn đã đọc những cái tài liệu mà anh gửi, thì nó có nhắc đến một việc đấy là các bạn cần phải,' },
        { time: 383.00, speaker: 'Test Speaker', text: 'Thì nó có nhắc đến một việc đấy là các bạn cần phải, bước đầu tiên đấy là các bạn cần phải có một cái nhìn rất là rõ ràng là cái vấn đề mình cần giải quyết đấy là gì.' },
        { time: 396.00, speaker: 'Test Speaker', text: 'Là cái vấn đề mình cần giải quyết đấy là gì. Thì đấy chính là bước problem definition. Ok? Ok? Vậy thì problem definition là gì? Problem definition là một cái, Problem definition là một cái, thường các bạn sẽ phải viết ra thành được một câu.' },
        { time: 419.00, speaker: 'Test Speaker', text: 'Và trong đó cái problem statement của mình phải nói ra được là mình sẽ giải quyết vấn đề gì. Hoặc là tốt hơn nữa đấy là mình muốn đạt được cái gì sau khi giải cái case này. Hoặc là tốt hơn nữa đấy là mình muốn đạt được cái gì sau khi giải cái case này.' },
        { time: 439.00, speaker: 'Test Speaker', text: 'Ví dụ, cái objective của các bạn sẽ là một cái ví dụ như là increase revenue của Gillette Brand. Là một cái brand về gia cạo dâu của P&G đúng không? Và cái vấn đề các bạn giải quyết thì nó sẽ chỉ là marketing và sales thôi.' },
        { time: 450.00, speaker: 'Test Speaker', text: 'Và cái vấn đề các bạn giải quyết thì nó sẽ chỉ là marketing và sales thôi. Nó không liên quan đến supply chain, nó không liên quan đến HR, nó không liên quan đến HR, nó không liên quan đến IT,' },
        { time: 460.00, speaker: 'Test Speaker', text: 'Nó không liên quan đến finance. Ví dụ như vậy. Và cái solution của các bạn muốn đạt được phải là Insightless. Và cái solution của các bạn muốn đạt được phải là Insightless. Insightless là gì? Nó phải dựa vào cái insight mà các bạn có được từ cái nghiên cứu với khách hàng.' },
        { time: 470.00, speaker: 'Test Speaker', text: 'Nó phải dựa vào cái insight mà các bạn có được từ cái nghiên cứu với khách hàng. Rồi nó phải sáng tạo. Nó không được lọc lặng những cái cũ, đúng không? Nó không được lọc lặng những cái cũ, đúng không? Rồi nó phải chỉ tập trung vào những cái khách hàng mới thôi.' },
        { time: 483.00, speaker: 'Test Speaker', text: 'Và nó phải là dành cho khu vực APAC, là khu vực Asia-Pacific. Đúng không? Đúng không? Hoặc là Thái Bình Dương. Vậy thì sau đấy, cái problem mà các bạn, Vậy thì sau đấy, cái problem mà các bạn, cái problem statement mà các bạn đưa ra để chính là.' },
        { time: 496.00, speaker: 'Test Speaker', text: 'Triển khai một cái, xây dựng một cái chiến lược, một cái gọi là chiến lược 3 năm. Một cái gọi là chiến lược 3 năm. Đúng không? Để dựa vào insight, đúng không? Để dựa vào insight, đúng không? Để có thể đạt được thêm những cái khách hàng mới.' },
        { time: 511.00, speaker: 'Test Speaker', text: 'Ở khu vực Asia-Pacific. Thì chủ yếu, cái bước này nó sẽ liên quan đến việc là cái bước này nó sẽ liên quan đến việc các bạn cần phải đọc xong đề, xong các bạn mới bắt đầu đưa ra những cái.' },
        { time: 522.00, speaker: 'Test Speaker', text: 'Xong các bạn mới bắt đầu đưa ra những cái. Ví dụ cái nào thì, mình có data về cái gì? Mình có data về marketing sales. Mình có data về supply chain hay không?' },
        { time: 532.00, speaker: 'Test Speaker', text: 'Mình có data về supply chain hay không? Có data về HR hay không? Đúng không? Đúng không? Thì sau đấy các bạn mới đưa ra 2 cái cụ. Đấy là cái gì in scope và cái gì out scope.' },
        { time: 541.00, speaker: 'Test Speaker', text: 'Đấy là cái gì in scope và cái gì out scope. In scope là gì? In scope là những cái gì mà, In scope là những cái gì mà, ví dụ mục tiêu của mình là tăng trưởng về doanh thu.' },
        { time: 550.00, speaker: 'Test Speaker', text: 'Đúng không? Thì in scope của các bạn, các bạn có data về marketing và sales. Các bạn có data về marketing và sales. Vậy thì có nghĩa là cái, và các bạn có thể là và các bạn có thể là không được research thêm data ở bên ngoài.' },
        { time: 561.00, speaker: 'Test Speaker', text: 'Vậy thì cái mục đích của các bạn, các bạn có thể đưa ra được, các bạn có thể giải quyết được, thì nó chỉ là cái vấn đề, nó chỉ là cái việc là marketing và sales thôi.' },
        { time: 571.00, speaker: 'Test Speaker', text: 'Nó chỉ là cái việc là marketing và sales thôi. Vì thế nên là khi mà các bạn đưa ra cái solution, thì nó sẽ chỉ liên quan đến marketing và sales thôi. Thì nó sẽ chỉ liên quan đến marketing và sales thôi. Đúng không?' },
        { time: 582.00, speaker: 'Test Speaker', text: 'Còn đối với những cái bạn mà, muốn recommend thêm supply chain, rồi HR, rồi IT, rồi finance. Rồi HR, rồi IT, rồi finance. Các bạn có thể đưa ra, nhưng vì nó là out scope, nhưng vì nó là out scope, vì nó không có data.' },
        { time: 593.00, speaker: 'Test Speaker', text: 'Vì thế nên là những cái recommendation liên quan đến những cái mà nó out scope, nó sẽ không được đánh giá cao, nó sẽ không được đánh giá cao, và đánh giá là lan man, nó không đi thẳng vào vấn đề.' },
        { time: 600.00, speaker: 'Test Speaker', text: 'Vì thế nên là, phải nắm rất là kỹ là, phải nắm rất là kỹ là, cái vấn đề mình cần giải quyết, nó liên quan đến cái gì? Nó liên quan đến cái gì? Mình có data liên quan đến cái gì?' },
        { time: 614.00, speaker: 'Test Speaker', text: 'Và những cái data mà mình không có trong tay, mình có được research hay không? Nếu được research, nếu được research, thì mình có thể tìm thấy những cái data mà nó hiệu quả, và nó giúp đưa... và nó giúp đưa... Ví dụ là,' },
        { time: 627.00, speaker: 'Test Speaker', text: 'Các bạn cảm thấy là, để tăng trưởng về revenue, supply chain nó cũng quan trọng, supply chain nó cũng quan trọng, HR nó cũng quan trọng, IT nó cũng quan trọng, IT nó cũng quan trọng, finance nó cũng quan trọng chẳng hạn.' },
        { time: 637.00, speaker: 'Test Speaker', text: 'Vậy thì, để không cho data về những cái đấy, các bạn có tìm được data gì quan trọng, các bạn có tìm được data gì quan trọng, gọi là nó giúp, để đạt được mục đích là tăng trưởng doanh thu,' },
        { time: 645.00, speaker: 'Test Speaker', text: 'Để đạt được mục đích là tăng trưởng doanh thu, mà nó cứ đưa cái mạng supply chain vào InScope hay không? Bởi vì nếu như không có data, bởi vì nếu như không có data, thì nó chẳng đao InScope.' },
        { time: 660.00, speaker: 'Test Speaker', text: 'Vậy thì, khi các bạn có một cái problem statement rồi, thì mình sẽ để một bước để là phân tích. Thì mình sẽ để một bước để là phân tích. Phân tích thì mọi người có hai cách, và ở đây hai cách này đều hoạt động quan trọng như nhau,' },
        { time: 675.00, speaker: 'Test Speaker', text: 'Và ở đây hai cách này đều hoạt động quan trọng như nhau, nhất là trong việc EMT, hoặc là thi business case competition. Còn đối với công việc sau này, thì thường top down sẽ là cái cách approach.' },
        { time: 689.00, speaker: 'Test Speaker', text: 'Thì thường top down sẽ là cái cách approach mà các bạn sẽ quan trọng nhất đối với các bạn. Lý do là gì? Lý do là gì? Đầu tiên mình sẽ có hai cái criteria, hoặc là hai cái yếu tố ảnh hưởng lên việc là mình chọn cái approach nào.' },
        { time: 702.00, speaker: 'Test Speaker', text: 'Hoặc là hai cái yếu tố ảnh hưởng lên việc là mình chọn cái approach nào. Top down nghĩa là các bạn đi từ objective, các bạn xây dựng lên một cái mà mọi người thường gọi là một bức tranh lớn,' },
        { time: 717.00, speaker: 'Test Speaker', text: 'Hay là big picture ấy. Và sau đấy các bạn mới đi phân tích những cái nhỏ hơn ở trong cái big picture đấy. Ở trong cái big picture đấy. Còn bottom up nghĩa là các bạn đi từ data.' },
        { time: 728.00, speaker: 'Test Speaker', text: 'Và để cho, hoặc là các data mà các bạn tìm được và bắt đầu xây dựng lên những cái analysis dựa vào những cái data mình có. Vậy thì khi mà lượng data các bạn có ít, Vậy thì khi mà lượng data các bạn có ít, thì cái cách approach top down rất là quan trọng.' },
        { time: 745.00, speaker: 'Test Speaker', text: 'Cái cách approach top down nó sẽ giúp cho các bạn biết được là cái data nào mình cần, cái data nào mình không cần. Cái data nào mình không cần. Vì thế là các bạn sẽ giảm hiểu được tối đa.' },
        { time: 756.00, speaker: 'Test Speaker', text: 'Thời gian research thêm về data. Còn khi mà nó bắt đầu có một ít data mà các bạn có thể research được mà các bạn có thể research được hoặc là có thể chỉ, ví dụ để chỉ cho là sử dụng data của đấy thôi,' },
        { time: 772.00, speaker: 'Test Speaker', text: 'Và nó khá ít, thì khi đấy cái bottom up data nó rất là hiệu quả trong việc là giúp các bạn định hướng cái phân tích của các bạn. Trong việc là giúp các bạn định hướng cái phân tích của các bạn. Tại vì sao?' },
        { time: 783.00, speaker: 'Test Speaker', text: 'Vì để giới hạn trong cái group data đấy nghĩa là vấn đề hay là một cái nguyên nhân sâu xa nào đó mà các bạn cần phải giải quyết, mà các bạn cần phải giải quyết, nó đang nằm trong đồng data đấy,' },
        { time: 794.00, speaker: 'Test Speaker', text: 'Thì các bạn sẽ chỉ việc là phân tích thật kỹ cái đồng data mà để cho để có thể đưa ra, để tìm thấy vấn đề và đưa ra cái giải quyết thôi. Không cần thiết phải đi từ top down xuống quá nhiều nữa.' },
        { time: 802.00, speaker: 'Test Speaker', text: 'Không cần thiết phải đi từ top down xuống quá nhiều nữa. Và khi mà để cho quá nhiều data, thì khi đấy cái top down và bottom up nó phải kết hợp 50-50 thì khi đấy cái top down và bottom up nó phải kết hợp 50-50 theo hướng là các bạn vừa phải đi top down xuống,' },
        { time: 817.00, speaker: 'Test Speaker', text: 'Nhưng mà vừa đi top down xuống thì vừa phải sử dụng data của đấy để liên tục kiểm tra, xem là ok, vậy thì cái top down của mình có vấn đề gì hay không? Xem là ok, vậy thì cái top down của mình có vấn đề gì hay không? Mình có thể loại bỏ cái nhánh nào hay không?' },
        { time: 831.00, speaker: 'Test Speaker', text: 'Thì để minh họa cho các bạn về việc đi top down và bottom up, thì mình sẽ có ví dụ như sau nhé. Ví dụ, cái problem assessment của mình, Ví dụ, cái problem assessment của mình, đấy là tăng trưởng về doanh thu của The Trainee Club trong vòng 20 năm tới,' },
        { time: 846.00, speaker: 'Test Speaker', text: 'À sorry, là 20% trong 3 năm tới. Vậy thì đối với cách tiếp cận top down, nó sẽ mổ xẻ thế problem này xuống thành những cái giải quyết nó sẽ mổ xẻ thế problem này xuống thành những cái giải quyết hay là những cái vấn đề nhỏ hơn.' },
        { time: 860.00, speaker: 'Test Speaker', text: 'Vậy thì ở đây mình đã có vấn đề là doanh thu, tăng trưởng về doanh thu đúng không? Vậy thì mình có một công thức rất là đơn giản, đấy là doanh thu thì sẽ bằng cái số lượng,' },
        { time: 869.00, speaker: 'Test Speaker', text: 'Đấy là doanh thu thì sẽ bằng cái số lượng, cái số lượng mà các bạn bán được, cái số lượng gọi là khóa học hay số lượng người đăng ký mà các bạn bán được, cái số lượng gọi là khóa học hay số lượng người đăng ký mà các bạn bán được, nhân với cái giá trung bình mà mỗi người phải trả cho khóa học của các bạn.' },
        { time: 887.00, speaker: 'Test Speaker', text: 'Vậy thì giả thuyết thứ nhất mình đặt ra là mình sẽ tăng trưởng doanh thu bằng cách là tăng trưởng về giá. Mình sẽ tăng giá để tăng doanh thu, đúng không? Mình sẽ tăng giá để tăng doanh thu, đúng không? Ví dụ như mình vẫn bán cho 100 học sinh,' },
        { time: 903.00, speaker: 'Test Speaker', text: 'Mà trước đây mình bán là 2 triệu, bây giờ mình tăng, muốn tăng 200 thì có phải là mình sẽ tăng thêm là 400 nghìn đúng không? Thành ra 2 triệu 4 là mình sẽ đạt được mục tiêu.' },
        { time: 911.00, speaker: 'Test Speaker', text: 'Thành ra 2 triệu 4 là mình sẽ đạt được mục tiêu. Còn giả thuyết số 2, để là mình bán nhiều hàng cho nhiều người hơn để là mình bán nhiều hàng cho nhiều người hơn và để tăng trưởng về doanh thu.' },
        { time: 927.00, speaker: 'Test Speaker', text: 'Vậy thì khi mình đã có 2 cái giả thuyết như vậy, các bạn sẽ phải đi tìm data để có thể chứng minh là hay là phủ định là hay là phủ định là bây giờ mình nói là mình có thể tăng giá,' },
        { time: 939.00, speaker: 'Test Speaker', text: 'Thì có yếu tố gì ảnh hưởng đến quyết định là mình tăng giá. Hay là mình nói là mình có thể bán được nhiều hàng hơn, thì có yếu tố gì ảnh hưởng lên cái việc là mình có thể bán được nhiều hàng hơn.' },
        { time: 947.00, speaker: 'Test Speaker', text: 'Thì có yếu tố gì ảnh hưởng lên cái việc là mình có thể bán được nhiều hàng hơn. Vậy thì đối với cái top down thì các bạn bắt buộc bởi vì các bạn không có nhiều data trong tay,' },
        { time: 955.00, speaker: 'Test Speaker', text: 'Bởi vì các bạn không có nhiều data trong tay, vậy thì tiếp tục mình sẽ đi top down như thế nào. Khi mà các bạn đưa ra được hypothesis rồi, Khi mà các bạn đưa ra được hypothesis rồi, thì các bạn sẽ phải vẽ lên một cái big picture.' },
        { time: 969.00, speaker: 'Test Speaker', text: 'Đấy là có những yếu tố gì ảnh hưởng lên cái hypothesis mà mình vừa đưa ra. Vừa rồi là mình nói đến việc là pricing, Vừa rồi là mình nói đến việc là pricing, mình nói đến việc là giá này,' },
        { time: 980.00, speaker: 'Test Speaker', text: 'Và mình nói đến việc là bán được nhiều hàng hơn. Vậy thì để rõ ràng hơn, để rõ ràng hơn, thì mình sẽ vẽ ra một cái bức tranh tổng thể ở trong cái thị trường, ở trong cái bối cảnh mà The Trading Club.' },
        { time: 997.00, speaker: 'Test Speaker', text: 'Là một công ty ở trong đấy. Thì có phải là Thứ nhất, The Trading Club sẽ có competitor, Thứ nhất, The Trading Club sẽ có competitor, sẽ có đối thủ cạnh tranh. Thứ hai, Thứ hai, đấy là mình sẽ có thêm là customer.' },
        { time: 1010.00, speaker: 'Test Speaker', text: 'Chắc chắn sẽ liên quan đúng không? Bởi vì họ là người trả tiền cho mình, họ là một người mua hàng, họ là một người mua hàng, vậy thì rõ ràng là họ sẽ có liên quan đến cái việc là mình tăng giá.' },
        { time: 1020.00, speaker: 'Test Speaker', text: 'Và cái việc là mình có bán được nhiều hàng hơn hay không. Vậy thì ngoài ra, ngoài ba cái cụ chính là ngoài ba cái cụ chính là The Trading Club là đối thủ là đối thủ và khách hàng.' },
        { time: 1033.00, speaker: 'Test Speaker', text: 'Vậy thì có những cái người nào có thể ảnh hưởng lên giá của mình và có thể ảnh hưởng lên và có thể ảnh hưởng lên việc mình có thể tăng giá hay là mình có thể bán được nhiều hàng hơn. Thì đầu tiên có phải là Thì đầu tiên có phải là mình bán nhiều hàng hơn có thể sẽ là nhờ.' },
        { time: 1045.00, speaker: 'Test Speaker', text: 'Những cái người gọi là trợ giúp mình đúng không? Những cái người trợ giúp mình bán được nhiều hàng hơn hay là tăng giá lên được. Hay là tăng giá lên được. Ví dụ, đấy là mình thông qua các cầu lạc bộ.' },
        { time: 1053.00, speaker: 'Test Speaker', text: 'Đấy là mình thông qua các cầu lạc bộ, mình thông qua các tổ chức khác có thể bán được có thể bán được tiếp cận đến nhiều khách hàng hơn. Thì rõ ràng là họ có thể giúp mình bán được nhiều hàng hơn.' },
        { time: 1061.00, speaker: 'Test Speaker', text: 'Thì rõ ràng là họ có thể giúp mình bán được nhiều hàng hơn. Đúng không? Thì đấy là cái cục thứ tư mà mình cần phải có. Thì đấy là cái cục thứ tư mà mình cần phải có. Và thứ năm,' },
        { time: 1071.00, speaker: 'Test Speaker', text: 'Đấy là những cái yếu tố bên ngoài mà ảnh hưởng đến cái quyết định mà mình có thể mà mình có thể ảnh hưởng đến việc là mình có thể tăng giá hay là mình có thể bán được nhiều hàng hơn.' },
        { time: 1079.00, speaker: 'Test Speaker', text: 'Hay là mình có thể bán được nhiều hàng hơn. Ví dụ, Ví dụ, Ví dụ, cái môi trường dựng, ví dụ như là về luật pháp đi, ví dụ như là về luật pháp đi, liệu là có cái mức giá nào mà mình có thể.' },
        { time: 1089.00, speaker: 'Test Speaker', text: 'Sẽ phải không được vượt quá hay không? Ví dụ như là người ta quyết định là một cái quả học một cái quả học không thể vượt quá là 10 triệu đồng cho hạn quả. 10 triệu đồng cho hạn quả. Ví dụ như thế đi.' },
        { time: 1101.00, speaker: 'Test Speaker', text: 'Hay là về mặt gọi là văn hóa, thì mình sẽ không được thì mình sẽ không được mình sẽ không được gọi là bán hàng cho những bạn sinh viên mà bán hàng cho những bạn sinh viên mà gọi là gì?' },
        { time: 1121.00, speaker: 'Test Speaker', text: 'Ví dụ như là mình sẽ không được bán cái khóa business case này dành cho các bạn học kỹ thuật chẳng hạn. Dành cho các bạn học kỹ thuật chẳng hạn. Ví dụ như vậy đi. Thì đấy là những cái giao cảm.' },
        { time: 1130.00, speaker: 'Test Speaker', text: 'Thì đấy là những cái giao cảm mà sẽ khiến cho mình không ảnh hưởng lên cái việc là không ảnh hưởng lên cái việc là mình có thể bán rất nhiều hàng hơn. Khi mình có một cái big picture như thế này,' },
        { time: 1141.00, speaker: 'Test Speaker', text: 'Khi mình có một cái big picture như thế này, mình sẽ bắt đầu đặt những cái câu hỏi là liệu những cái yếu tố đấy liệu những cái yếu tố đấy nó bắt đầu ảnh hưởng lên cái giả thuyết của mình như thế nào?' },
        { time: 1153.00, speaker: 'Test Speaker', text: 'Giả thuyết của mình như thế nào? Ví dụ, và cách mình đặt câu hỏi sẽ là đặt bằng và cách mình đặt câu hỏi sẽ là đặt bằng how, what, rồi là how much, rồi là how much, rồi là why,' },
        { time: 1165.00, speaker: 'Test Speaker', text: 'Rồi là who, rồi là where. Những cái câu hỏi như vậy sẽ giúp cho các bạn Những cái câu hỏi như vậy sẽ giúp cho các bạn ảnh hưởng được là liệu là mình cần cái data gì liệu là mình cần cái data gì để có thể kiểm chứng được là.' },
        { time: 1179.00, speaker: 'Test Speaker', text: 'Mình có thể tăng giá và mình có thể bán rất nhiều hàng. Ví dụ, mình đặt một câu hỏi đấy là mình đặt một câu hỏi đấy là để so sánh với đối thủ đi. Hàng của mình tốt hơn hàng,' },
        { time: 1188.00, speaker: 'Test Speaker', text: 'Hàng của mình tốt hơn hàng, gọi là khoa học của mình tốt hơn khoa học của đối thủ như thế nào? Khoa học của đối thủ như thế nào? Vậy thì khi mình biết là nó tốt hơn thì mình sẽ bắt đầu có.' },
        { time: 1198.00, speaker: 'Test Speaker', text: 'Thì mình sẽ bắt đầu có mình sẽ có cái lý do để tăng giá, mình sẽ có lý do để có thể mình sẽ có lý do để có thể đưa ra cái giá cao hơn so với đối thủ.' },
    ];
    
    

    const formatDuration = (duration) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime); // Update currentTime as video plays
        }
    };

    const jumpToTime = (time) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time; // Jump to the clicked transcript time
            videoRef.current.play();
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Optionally implement navigation between search results here if needed
        }
    };

    const handleSaveName = () => {
        setIsEditing(false);
        if (onVideoNameChange) {
            onVideoNameChange(videoName);
        }
    };

    return (
        <Box w="100%" p={6} bg="white">
            <Button onClick={onBack} mb={4}>Back to Home</Button>

            <VStack align="start" spacing={4}>
                <Flex>
                    <video
                        ref={videoRef}
                        width="600"
                        controls
                        style={{ borderRadius: '10px' }}
                        onTimeUpdate={handleTimeUpdate}
                    >
                        <source src={video.videoURL} type={video.file.type} />
                    </video>
                    <Box ml={4}>
                        {isEditing ? (
                            <Input
                                value={videoName}
                                onChange={(e) => setVideoName(e.target.value)}
                                onBlur={handleSaveName}
                                onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
                                autoFocus
                            />
                        ) : (
                            <Flex alignItems="center">
                                <Text fontWeight="bold">{videoName}</Text>
                                <IconButton
                                    aria-label="Edit Name"
                                    icon={<FiPenTool />}
                                    onClick={() => setIsEditing(true)}
                                    ml={2}
                                    variant="ghost"
                                />
                            </Flex>
                        )}
                        <Text fontSize="sm">Duration: {video.duration ? formatDuration(video.duration) : 'N/A'}</Text>
                        <Text fontSize="sm">Uploaded on: {new Date(video.uploadDate).toLocaleDateString()}</Text>
                        <IconButton
                            aria-label="Share"
                            icon={<FiShare2 />}
                            onClick={() => alert('Share button clicked!')}
                            mt={2}
                        />
                    </Box>
                </Flex>

                <Tabs isFitted variant="enclosed" w="100%">
                    <TabList>
                        <Tab>Summary</Tab>
                        <Tab>Transcript</Tab>
                        <Tab>Ask Beta</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <VideoSummary videoId={video.file.id} />
                        </TabPanel>
                        <TabPanel>
                            <HStack justify="space-between" mb={2}>
                                <Input
                                    placeholder="Search Transcript"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    onKeyPress={handleKeyPress}
                                    icon={<FiSearch />}
                                    variant="outline"
                                    w="200px"
                                />
                                <Flex gap={3}>
                                    <Button
                                        leftIcon={<FiCopy />}
                                        onClick={() => navigator.clipboard.writeText(transcript.map(entry => `${entry.speaker}: ${entry.text}`).join('\n'))}
                                    >
                                        Copy Transcript
                                    </Button>
                                    <Button
                                        onClick={() => setAutoScrollEnabled((prev) => !prev)}
                                        colorScheme={autoScrollEnabled ? 'red' : 'green'}
                                    >
                                        {autoScrollEnabled ? 'Disable Auto-Scroll' : 'Enable Auto-Scroll'}
                                    </Button>
                                </Flex>
                            </HStack>

                            <Transcript
                                transcript={transcript} // No filtering, just pass all transcript entries
                                currentTime={currentTime}
                                onTranscriptClick={jumpToTime}
                                videoDuration={video.duration}
                                searchTerm={searchTerm} // Highlight search term
                                autoScrollEnabled={autoScrollEnabled}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ChatBot />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </Box>
    );
}

export default VideoDetailPage;

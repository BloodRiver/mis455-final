document.addEventListener("DOMContentLoaded", function () {
    // Mock Data for Academic Statistics (Existing functionality)
    const studentStats = {
        cgpa: "3.75",
        creditsAttempted: 90,
        creditsEarned: 84,
        creditsRetaken: 6
    };

    // Mock Data for Course Attendance
    const attendanceData = [
        {
            code: "CSC100",
            section: "A",
            timing: "Mon/Wed 10:00 AM - 11:30 AM",
            classroom: "LH-101",
            attended: 12,
            total: 15
        },
        {
            code: "ENG101",
            section: "B",
            timing: "Sun/Tue 10:00 AM - 11:30 AM",
            classroom: "AC-203",
            attended: 8,
            total: 15
        },
        {
            code: "MAT104",
            section: "C",
            timing: "Mon/Wed 11:40 AM - 1:10 PM",
            classroom: "SC-305",
            attended: 4,
            total: 15
        },
        {
            code: "PHY101",
            section: "D",
            timing: "Sun/Tue 11:30 AM - 1:10 PM",
            classroom: "LH-201",
            attended: 14,
            total: 15
        },
        {
            code: "CSC101",
            section: "A",
            classroom: "LH-102",
            attended: 10,
            total: 15
        },
        {
            code: "ENG102",
            section: "B",
            timing: "Mon/Wed 1:20 PM - 2:50 PM",
            classroom: "AC-204",
            attended: 3,
            total: 15
        }
    ];

    // Function to populate Course Attendance Cards
    function populateAttendanceCards() {
        const container = document.getElementById('attendance-cards-container');
        container.innerHTML = ''; // Clear existing content

        attendanceData.forEach(course => {
            const percentage = (course.attended / course.total) * 100;
            let cardClass = 'blue'; // Default to blue

            if (percentage < 60 && percentage >= 30) {
                cardClass = 'orange';
            } else if (percentage < 30) {
                cardClass = 'red';
            }

            const cardHtml = `
                <div class="attendance-card ${cardClass}">
                    <div>
                        <h5>${course.code} - Section ${course.section}</h5>
                        <p>Classroom: ${course.classroom}</p>
                        <p>Time: ${course.timing}</p>
                    </div>
                    <div class="attendance-figure">${course.attended}/${course.total}</div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    // Function to populate Academic Statistics (Existing functionality)
    function populateAcademicStats() {
        const statsContainer = document.getElementById('stats-container');
        statsContainer.innerHTML = ''; // Clear existing content

        const statsData = [
            { label: "Current CGPA", value: studentStats.cgpa },
            { label: "Credits Attempted", value: studentStats.creditsAttempted },
            { label: "Credits Earned", value: studentStats.creditsEarned },
            { label: "Credits Re-taken", value: studentStats.creditsRetaken }
        ];

        statsData.forEach(stat => {
            const statCard = `
                <div class="col">
                    <div class="card stat-card">
                        <div class="card-body">
                            <h3 class="display-4">${stat.value}</h3>
                            <p class="lead">${stat.label}</p>
                        </div>
                    </div>
                </div>
            `;
            statsContainer.insertAdjacentHTML('beforeend', statCard);
        });
    }

    // Mock Data for Available Courses (Existing functionality)
    const availableCourses = [
        {
            code: "CS101",
            title: "Introduction to Programming",
            section: "A",
            timing: "Mon/Wed 10:00 AM - 11:30 AM"
        },
        {
            code: "MA201",
            title: "Calculus I",
            section: "B",
            timing: "Tue/Thu 09:00 AM - 10:30 AM"
        },
        {
            code: "PH101",
            title: "General Physics",
            section: "C",
            timing: "Mon/Wed/Fri 01:00 PM - 02:00 PM"
        },
        {
            code: "EN305",
            title: "Technical Writing",
            section: "D",
            timing: "Tue/Thu 02:00 PM - 03:30 PM"
        },
        {
            code: "EC202",
            title: "Microeconomics",
            section: "A",
            timing: "Mon/Wed 11:30 AM - 01:00 PM"
        },
        {
            code: "CS305",
            title: "Data Structures and Algorithms",
            section: "B",
            timing: "Tue/Thu 10:30 AM - 12:00 PM"
        }
    ];

    // Function to populate Available Courses Table (Existing functionality)
    function populateCoursesTable() {
        const coursesTableBody = document.getElementById('courses-table-body');
        coursesTableBody.innerHTML = ''; // Clear existing content

        if (availableCourses.length === 0) {
            coursesTableBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No courses available at this time.</td></tr>';
            return;
        }

        availableCourses.forEach(course => {
            const courseRow = `
                <tr>
                    <td data-label="Course Code">${course.code}</td>
                    <td data-label="Course Title">${course.title}</td>
                    <td data-label="Section">${course.section}</td>
                    <td data-label="Timing">${course.timing}</td>
                </tr>
            `;
            coursesTableBody.insertAdjacentHTML('beforeend', courseRow);
        });
    }

    // Call functions to populate sections on page load
    populateAcademicStats();
    populateCoursesTable();

    // --- Course Prerequisite Tree Diagram Logic ---
    const courseData = [
        { code: "CSC100", title: "Intro to CS", prereqs: [] },
        { code: "ENG101", title: "English Comp", prereqs: [] },
        { code: "MAT104", title: "Calculus I", prereqs: [] },
        { code: "PHY101", title: "Physics I", prereqs: [] },
        { code: "CSC101", title: "Data Structures", prereqs: ["CSC100"] },
        { code: "ENG102", title: "Advanced Comp", prereqs: ["ENG101"] },
        { code: "ENG105", title: "Creative Writing", prereqs: ["ENG102"] },
        { code: "CSE104", title: "Digital Logic", prereqs: ["MAT104", "PHY101"] },
        { code: "MAT212", title: "Linear Algebra", prereqs: ["MAT104"] },
        { code: "PHY102", title: "Physics II", prereqs: ["PHY101"] },
    ];

    const coursesMap = new Map(courseData.map(c => [c.code, c]));
    const childrenMap = {}; // Maps parent course code to an array of its direct children (courses that depend on it)

    // Initialize childrenMap
    courseData.forEach(course => {
        childrenMap[course.code] = [];
    });

    // Populate childrenMap based on prerequisites
    courseData.forEach(course => {
        course.prereqs.forEach(prereqCode => {
            if (childrenMap[prereqCode]) {
                childrenMap[prereqCode].push(course.code);
            }
        });
    });

    // Calculate the level (depth) of each course in the tree
    const courseLevels = {}; // Maps course code to its calculated level
    const levels = {}; // Maps level number to an array of course codes at that level

    function calculateCourseLevels() {
        let maxLevel = 0;

        // Helper to get level, defaulting to -1 if not calculated yet
        const getLevel = (courseCode) => courseLevels[courseCode] !== undefined ? courseLevels[courseCode] : -1;

        // Iterate until no levels change (stable state)
        let changed = true;
        while (changed) {
            changed = false;
            courseData.forEach(course => {
                let currentCourseLevel = courseLevels[course.code] || 0; // Default to 0 for initial pass

                if (course.prereqs.length === 0) {
                    // Root nodes (no prerequisites) are level 0
                    if (courseLevels[course.code] !== 0) {
                        courseLevels[course.code] = 0;
                        changed = true;
                    }
                } else {
                    let maxPrereqLevel = -1;
                    let allPrereqsKnown = true;
                    for (const prereqCode of course.prereqs) {
                        const prereqLevel = getLevel(prereqCode);
                        if (prereqLevel === -1) { // Prerequisite level not yet determined
                            allPrereqsKnown = false;
                            break;
                        }
                        maxPrereqLevel = Math.max(maxPrereqLevel, prereqLevel);
                    }

                    if (allPrereqsKnown) {
                        const newLevel = maxPrereqLevel + 1;
                        if (courseLevels[course.code] !== newLevel) {
                            courseLevels[course.code] = newLevel;
                            changed = true;
                        }
                    }
                }
                maxLevel = Math.max(maxLevel, courseLevels[course.code] || 0);
            });
        }

        // Organize courses by level after all levels are determined
        for (let i = 0; i <= maxLevel; i++) {
            levels[i] = [];
        }
        courseData.forEach(course => {
            levels[courseLevels[course.code]].push(course.code);
        });

        return maxLevel;
    }

    const maxLevel = calculateCourseLevels();

    // Node dimensions and spacing for SVG rendering
    const nodeWidth = 160;
    const nodeHeight = 60;
    const horizontalSpacing = 80; // Space between levels
    const verticalNodePadding = 30; // Padding above/below each node within its vertical slot

    // Define Y-coordinates for labels and the start of nodes
    const recommendedLabelY = 25; // Y for "Recommended Semester:"
    const semesterLabelsRowY = 60; // Y for "Semester 1", "Semester 2", etc.
    const nodeAreaTopOffset = 90; // Y offset where the first row of nodes begins (below all labels)

    // Calculate overall SVG dimensions
    let svgWidth = (maxLevel + 1) * (nodeWidth + horizontalSpacing) + 50; // Add some padding
    const maxNodesInAnyLevel = Math.max(...Object.values(levels).map(arr => arr.length));
    let svgHeight = maxNodesInAnyLevel * (nodeHeight + verticalNodePadding) + nodeAreaTopOffset + 40; // Add top offset and bottom padding

    // Store calculated positions for each node
    const nodePositions = {}; // { courseCode: { x, y } }

    // Assign positions to nodes, adjusting for the new top offset
    Object.keys(levels).forEach(levelIdx => {
        const courseCodesInLevel = levels[levelIdx];
        const startX = parseInt(levelIdx) * (nodeWidth + horizontalSpacing) + 20; // X position for this level

        // Calculate total height needed for this specific level
        const totalLevelContentHeight = courseCodesInLevel.length * (nodeHeight + verticalNodePadding);
        // Center this level vertically within the remaining SVG height, starting below the nodeAreaTopOffset
        let currentY = nodeAreaTopOffset + (svgHeight - nodeAreaTopOffset - totalLevelContentHeight) / 2;

        courseCodesInLevel.forEach(courseCode => {
            nodePositions[courseCode] = { x: startX, y: currentY };
            currentY += (nodeHeight + verticalNodePadding);
        });
    });

    // Function to render the course tree diagram using SVG
    function renderCourseTree() {
        const treeContainer = document.getElementById('course-tree-diagram');
        treeContainer.innerHTML = ''; // Clear previous content

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', svgWidth);
        svg.setAttribute('height', svgHeight); // Set height based on content
        svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`); // Allow scaling
        svg.style.border = '1px solid #e9ecef';
        svg.style.borderRadius = '10px';
        svg.style.backgroundColor = '#f8f9fa';
        svg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';

        // Define arrowhead marker for lines
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '0'); // Point of the arrow
        marker.setAttribute('refY', '3.5'); // Center of the arrow
        marker.setAttribute('orient', 'auto');
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
        polygon.setAttribute('fill', '#007bff');
        marker.appendChild(polygon);
        defs.appendChild(marker);
        svg.appendChild(defs);

        // Add "Recommended Semester:" label at top-left
        const recommendedLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        recommendedLabel.setAttribute('x', 20);
        recommendedLabel.setAttribute('y', recommendedLabelY);
        recommendedLabel.setAttribute('dominant-baseline', 'middle');
        recommendedLabel.setAttribute('font-size', '1.1rem');
        recommendedLabel.setAttribute('font-weight', '600');
        recommendedLabel.setAttribute('fill', '#002147');
        recommendedLabel.textContent = "Recommended Semester:";
        svg.appendChild(recommendedLabel);

        // Draw semester labels on a new line
        Object.keys(levels).forEach(levelIdx => {
            const startX = parseInt(levelIdx) * (nodeWidth + horizontalSpacing) + 20;
            const semesterText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            semesterText.setAttribute('x', startX + nodeWidth / 2); // Center above the level
            semesterText.setAttribute('y', semesterLabelsRowY); // Position on the new line
            semesterText.setAttribute('dominant-baseline', 'middle');
            semesterText.setAttribute('text-anchor', 'middle');
            semesterText.setAttribute('font-size', '1rem');
            semesterText.setAttribute('font-weight', 'bold');
            semesterText.setAttribute('fill', '#007bff'); /* Blue color for semester labels */
            semesterText.textContent = `Semester ${parseInt(levelIdx) + 1}`;
            svg.appendChild(semesterText);
        });

        // Draw nodes first
        courseData.forEach(course => {
            const pos = nodePositions[course.code];
            if (!pos) return;

            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', nodeWidth);
            rect.setAttribute('height', nodeHeight);
            rect.setAttribute('rx', '10'); // Rounded corners
            rect.setAttribute('ry', '10');
            rect.setAttribute('fill', '#002147'); /* Dark blue background for nodes */
            rect.setAttribute('stroke', '#007bff'); /* Blue border */
            rect.setAttribute('stroke-width', '2');
            group.appendChild(rect);

            const textCode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textCode.setAttribute('x', nodeWidth / 2);
            textCode.setAttribute('y', nodeHeight / 2 - 10);
            textCode.setAttribute('dominant-baseline', 'middle');
            textCode.setAttribute('text-anchor', 'middle');
            textCode.setAttribute('font-size', '1rem');
            textCode.setAttribute('font-weight', '600');
            textCode.setAttribute('fill', 'white');
            textCode.textContent = course.code;
            group.appendChild(textCode);

            const textTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textTitle.setAttribute('x', nodeWidth / 2);
            textTitle.setAttribute('y', nodeHeight / 2 + 15);
            textTitle.setAttribute('dominant-baseline', 'middle');
            textTitle.setAttribute('text-anchor', 'middle');
            textTitle.setAttribute('font-size', '0.8rem');
            textTitle.setAttribute('fill', '#d1e7dd'); /* Lighter color for title */
            textTitle.textContent = course.title;
            group.appendChild(textTitle);

            svg.appendChild(group);
        });

        // Draw lines (connections) after nodes
        courseData.forEach(course => {
            const parentPos = nodePositions[course.code];
            if (!parentPos) return;

            childrenMap[course.code].forEach(childCode => {
                const childPos = nodePositions[childCode];
                if (!childPos) return;

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', parentPos.x + nodeWidth); // Start from right edge of parent
                line.setAttribute('y1', parentPos.y + nodeHeight / 2); // Center vertically
                line.setAttribute('x2', childPos.x); // End at left edge of child
                line.setAttribute('y2', childPos.y + nodeHeight / 2); // Center vertically
                line.setAttribute('stroke', '#007bff'); /* Blue line */
                line.setAttribute('stroke-width', '2');
                line.setAttribute('marker-end', 'url(#arrowhead)'); // Add arrowhead
                svg.appendChild(line);
            });
        });

        treeContainer.appendChild(svg);
    }

    // Call functions to populate sections on page load
    populateAttendanceCards();
    populateAcademicStats();
    renderCourseTree(); // Render the tree diagram
    populateCoursesTable();
});
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>University Programs</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .card {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding: 16px;
            gap: 12px;
            width: 100%;
            max-width: 800px;
            background: rgba(255, 255, 255, 0.1);
            /* Simple semi-transparent background */
            border: 1px solid rgba(255, 255, 255, 0.2);
            /* Subtle border */
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            /* Light shadow */
            overflow: hidden;
            transition: backdrop-filter 0.3s ease, background 0.3s ease, opacity 0.3s ease;
            /* Smooth transition for hover effect */
        }

        .card:hover {
            background: rgba(173, 216, 230, 0.3);
            /* Light blue background on hover */
            backdrop-filter: blur(25px);
            /* Apply blur effect on hover */
            opacity: 1;
            /* Ensure the hovered card is fully visible */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            /* Enhance shadow on hover */
        }

        #cards-container .card:not(:hover) {
            opacity: 1;
            /* Keep all cards fully visible when not hovering */
        }

        .card-content {
            flex-grow: 1;
        }

        .curriculum {
            max-height: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .see-more {
            align-self: flex-end;
            margin-top: auto;
        }

        #cards-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }
    </style>
</head>

<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold text-center mb-6">University Programs</h1>
        <div id="cards-container" class="flex flex-wrap justify-center gap-6">
            <!-- Cards will be dynamically inserted here -->
        </div>
    </div>

    <script>
        // Fetch data from the API
        fetch('https://devsfong.github.io/test_json/university_info.json')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('cards-container');

                // Iterate over programs and create cards
                Object.keys(data).forEach(program => {
                    data[program].forEach(university => {
                        const card = document.createElement('div');
                        card.className = 'card';

                        // Limit curriculum to 4 items
                        const curriculumItems = university.curriculum.split(', ');
                        const shortCurriculum = curriculumItems.slice(0, 4).join(', ') + (curriculumItems.length > 4 ? ', ...' : '');

                        card.innerHTML = `
                            <div class="card-content">
                                <h2 class="text-xl font-semibold text-gray-800">${university.university}</h2>
                                <p class="text-gray-600 mt-2"><strong>Program:</strong> ${program}</p>
                                <p class="text-gray-600 mt-2 curriculum"><strong>Curriculum:</strong> ${shortCurriculum}</p>
                                <p class="text-gray-600 mt-2"><strong>Tuition:</strong> ${university.tuition}</p>
                                <p class="text-gray-600 mt-2"><strong>Location:</strong> ${university.location}</p>
                                <p class="text-gray-600 mt-2"><strong>Contact:</strong> ${university.contact}</p>
                            </div>
                            <a href="details.html?program=${encodeURIComponent(program)}&university=${encodeURIComponent(university.university)}" class="see-more bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center">See More</a>
                        `;

                        container.appendChild(card);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    </script>
</body>

</html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
        <a href="/logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</a>
        <div class="mt-6">
            <h2 class="text-2xl font-semibold mb-4">Add New Program</h2>
            <form id="add-program-form" class="bg-white p-4 rounded shadow-md">
                <div class="mb-4">
                    <label for="major" class="block text-gray-700">Major</label>
                    <input type="text" id="major" name="major" class="w-full px-3 py-2 border rounded" required>
                </div>
                <div class="mb-4">
                    <label for="university" class="block text-gray-700">University Name</label>
                    <input type="text" id="university" name="university" class="w-full px-3 py-2 border rounded"
                        required>
                </div>
                <div class="mb-4">
                    <label for="curriculum" class="block text-gray-700">Curriculum</label>
                    <textarea id="curriculum" name="curriculum" class="w-full px-3 py-2 border rounded"
                        required></textarea>
                </div>
                <div class="mb-4">
                    <label for="duration" class="block text-gray-700">Duration</label>
                    <input type="text" id="duration" name="duration" class="w-full px-3 py-2 border rounded" required>
                </div>
                <div class="mb-4">
                    <label for="tuition" class="block text-gray-700">Tuition</label>
                    <input type="text" id="tuition" name="tuition" class="w-full px-3 py-2 border rounded" required>
                </div>
                <div class="mb-4">
                    <label for="location" class="block text-gray-700">Location</label>
                    <input type="text" id="location" name="location" class="w-full px-3 py-2 border rounded" required>
                </div>
                <div class="mb-4">
                    <label for="contact" class="block text-gray-700">Contact</label>
                    <input type="text" id="contact" name="contact" class="w-full px-3 py-2 border rounded" required>
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add
                    Program</button>
            </form>
        </div>
        <div class="mt-6">
            <h2 class="text-2xl font-semibold mb-4">Existing Programs</h2>
            <div id="programs-container">
                {% for major, programs in programs.items() %}
                <div class="mb-4">
                    <h3 class="text-xl font-bold">{{ major }}</h3>
                    <ul class="list-disc pl-6">
                        {% for program in programs %}
                        <li>
                            <strong>{{ program.university }}</strong> - {{ program.curriculum }}
                            <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 delete-program"
                                data-major="{{ major }}" data-university="{{ program.university }}">Delete</button>
                        </li>
                        {% endfor %}
                    </ul>
                </div>
                {% endfor %}
            </div>
        </div>
    </div>
    <script>
        document.getElementById('add-program-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const response = await fetch('/admin/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Program added successfully!');
                location.reload();
            } else {
                alert('Failed to add program.');
            }
        });

        document.querySelectorAll('.delete-program').forEach(button => {
            button.addEventListener('click', async () => {
                const major = button.getAttribute('data-major');
                const university = button.getAttribute('data-university');

                const response = await fetch('/admin/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ major, university })
                });

                if (response.ok) {
                    alert('Program deleted successfully!');
                    location.reload();
                } else {
                    alert('Failed to delete program.');
                }
            });
        });
    </script>
</body>

</html>
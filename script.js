document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  const form = document.getElementById('patientForm');
  const feedback = document.getElementById('formFeedback');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = {
        name: form.name.value.trim(),
        document: form.document.value.trim(),
        birthdate: form.birthdate.value,
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        address: form.address.value.trim(),
        symptoms: form.symptoms.value.trim(),
        doctor: form.doctor.value,
      };

      if (!formData.name || !formData.document || !formData.birthdate || !formData.phone || !formData.doctor) {
        feedback.textContent = 'Por favor completa los campos obligatorios.';
        feedback.style.color = '#dc2626';
        return;
      }

      try {
        const endpoint = (window && window.BACKEND_URL) ? window.BACKEND_URL : '/api/register';
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
          feedback.textContent = result.error || 'Error al registrar al paciente.';
          feedback.style.color = '#dc2626';
          return;
        }

        feedback.textContent = result.message;
        feedback.style.color = '#16a34a';
        form.reset();
      } catch (error) {
        feedback.textContent = 'No se pudo conectar con el servidor. Intenta de nuevo.';
        feedback.style.color = '#dc2626';
      }
    });
  }
});

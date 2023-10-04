// import React, { useState } from 'react';

// function PerfilForm({ user, onUpdateUser }) {
//   const [formData, setFormData] = useState({
//     nome: user.nome || '',
//     email: user.email || '',
//     // Outros campos de perfil...
//   });

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     onUpdateUser(formData);
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="nome">Nome:</label>
//         <input
//           type="text"
//           id="nome"
//           name="nome"
//           value={formData.nome}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//       </div>
//       {/* Outros campos de perfil... */}
//       <button type="submit">Salvar Alterações</button>
//     </form>
//   );
// }

// export default PerfilForm;

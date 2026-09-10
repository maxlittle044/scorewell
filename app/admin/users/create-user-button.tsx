"use client";

import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import { createUserAction } from "./actions";

const swalButtons = {
  customClass: {
    popup: "scorewell-swal-popup",
    title: "scorewell-swal-title",
    htmlContainer: "scorewell-swal-text",
    confirmButton: "scorewell-swal-confirm",
    cancelButton: "scorewell-swal-cancel",
  },
};

/**
 * The dialog body is a template literal handed to SweetAlert as raw HTML, not JSX. That
 * distinction bit once already: the role options were written `selected={defaultRole === …}`,
 * which the browser parsed as a bare `selected` attribute on *both* options, and a
 * single-select keeps the last one — so "Admin" was preselected and creating a user without
 * touching the dropdown quietly made them an administrator.
 */
export function CreateUserButton({ defaultRole = "USER" }: { defaultRole?: "USER" | "ADMIN" }) {
  async function createUser() {
    const result = await Swal.fire({
      title: "Create user",
      html: `
        <input id="swal-user-name" class="swal2-input scorewell-user-field" placeholder="Full name" aria-label="Full name">
        <input id="swal-user-email" class="swal2-input scorewell-user-field" type="email" placeholder="Email address" aria-label="Email address">
        <input id="swal-user-password" class="swal2-input scorewell-user-field" type="password" placeholder="Temporary password" aria-label="Temporary password">
        <select id="swal-user-role" class="swal2-select scorewell-user-field" aria-label="User role">
          <option value="USER"${defaultRole === "USER" ? " selected" : ""}>User</option>
          <option value="ADMIN"${defaultRole === "ADMIN" ? " selected" : ""}>Admin</option>
        </select>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Create user",
      ...swalButtons,
      preConfirm: () => {
        const name = (document.getElementById("swal-user-name") as HTMLInputElement).value;
        const email = (document.getElementById("swal-user-email") as HTMLInputElement).value;
        const password = (document.getElementById("swal-user-password") as HTMLInputElement).value;
        const role = (document.getElementById("swal-user-role") as HTMLSelectElement).value;
        if (!name.trim() || !email.trim() || password.length < 6) {
          Swal.showValidationMessage("Enter a name, valid email, and password of at least 6 characters.");
          return undefined;
        }
        return { name, email, password, role: role as "USER" | "ADMIN" };
      },
    });

    if (!result.isConfirmed || !result.value) return;

    const response = await createUserAction(result.value);
    await Swal.fire({
      icon: response.error ? "error" : "success",
      title: response.error ? "Could not create user" : "User created",
      text: response.error ?? response.success,
      ...swalButtons,
    });
    if (!response.error) window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={createUser}
      className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
    >
      <Plus className="h-4 w-4" /> Create user
    </button>
  );
}
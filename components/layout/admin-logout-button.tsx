"use client";

import { LogOut } from "lucide-react";
import Swal from "sweetalert2";
import { signOutAction } from "@/lib/auth-actions";

const swalButtons = {
  customClass: {
    popup: "scorewell-swal-popup",
    title: "scorewell-swal-title",
    htmlContainer: "scorewell-swal-text",
    confirmButton: "scorewell-swal-danger",
    cancelButton: "scorewell-swal-cancel",
  },
};

type Props = {
  mobile?: boolean;
  onLogout?: () => void;
};

export function AdminLogoutButton({ mobile = false, onLogout }: Props) {
  async function handleLogout() {
    const result = await Swal.fire({
      icon: "warning",
      title: "Log out of admin?",
      text: "You will need to sign in again to access the admin workspace.",
      showCancelButton: true,
      confirmButtonText: "Log out",
      cancelButtonText: "Stay signed in",
      ...swalButtons,
    });

    if (!result.isConfirmed) return;
    onLogout?.();
    await signOutAction();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={
        mobile
          ? "mt-3 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          : "mt-4 flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left text-xs font-semibold text-white/60 transition-colors hover:border-red-300/30 hover:bg-red-400/10 hover:text-red-100"
      }
    >
      <LogOut className={mobile ? "h-4 w-4" : "h-3.5 w-3.5"} />
      Log out
    </button>
  );
}

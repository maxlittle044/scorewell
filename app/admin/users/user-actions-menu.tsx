"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  Check,
  Edit3,
  KeyRound,
  LoaderCircle,
  MoreHorizontal,
  ShieldOff,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { describeAuthError, getFirebaseAuth } from "@/lib/firebase/client";
import {
  deleteUserAction,
  recordPasswordResetAction,
  setUserDisabledAction,
  setUserRoleAction,
  updateUserNameAction,
} from "./actions";

type UserRole = "USER" | "ADMIN";

type Props = {
  userId: string;
  email: string;
  name: string | null;
  role: UserRole;
  disabled: boolean;
};

const swalButtons = {
  customClass: {
    popup: "scorewell-swal-popup",
    title: "scorewell-swal-title",
    htmlContainer: "scorewell-swal-text",
    confirmButton: "scorewell-swal-confirm",
    cancelButton: "scorewell-swal-cancel",
  },
};

export function UserActionsMenu({ userId, email, name, role, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [pending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);
  const portalMenuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !portalMenuRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    function positionMenu() {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const menuWidth = 240;
      const menuHeight = 220;
      const gap = 8;
      const left = Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8));
      const top = rect.bottom + menuHeight + 8 <= window.innerHeight
        ? rect.bottom + gap
        : Math.max(8, rect.top - menuHeight - gap);

      setMenuPosition({ top, left });
    }

    positionMenu();
    window.addEventListener("resize", positionMenu);
    window.addEventListener("scroll", positionMenu, true);
    return () => {
      window.removeEventListener("resize", positionMenu);
      window.removeEventListener("scroll", positionMenu, true);
    };
  }, [open]);

  function toggleMenu() {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        left: Math.max(8, Math.min(rect.right - 240, window.innerWidth - 248)),
      });
    }
    setOpen((value) => !value);
  }

  function showResult(result: { error?: string; success?: string }) {
    if (result.error) {
      void Swal.fire({ icon: "error", title: "Action failed", text: result.error, ...swalButtons });
      return;
    }

    void Swal.fire({ icon: "success", title: "Done", text: result.success, ...swalButtons });
    router.refresh();
  }

  function runServerAction(action: () => Promise<{ error?: string; success?: string }>) {
    startTransition(async () => showResult(await action()));
  }

  async function editName() {
    setOpen(false);
    const result = await Swal.fire({
      title: "Edit user name",
      input: "text",
      inputValue: name ?? "",
      inputLabel: email,
      inputPlaceholder: "Full name",
      showCancelButton: true,
      confirmButtonText: "Save name",
      ...swalButtons,
      inputValidator: (value) =>
        !value.trim() || value.trim().length > 100
          ? "Enter a name between 1 and 100 characters."
          : undefined,
    });

    if (result.isConfirmed) {
      runServerAction(() => updateUserNameAction(userId, result.value));
    }
  }

  async function resetPassword() {
    setOpen(false);
    const result = await Swal.fire({
      icon: "question",
      title: "Send password reset link?",
      text: `Firebase will send a reset email to ${email}.`,
      showCancelButton: true,
      confirmButtonText: "Send link",
      ...swalButtons,
    });
    if (!result.isConfirmed) return;

    try {
      await sendPasswordResetEmail(getFirebaseAuth(), email);
      await recordPasswordResetAction(userId);
      await Swal.fire({ icon: "success", title: "Reset link sent", text: `Email sent to ${email}.`, ...swalButtons });
    } catch (error) {
      await Swal.fire({ icon: "error", title: "Could not send link", text: describeAuthError(error), ...swalButtons });
    }
  }

  async function toggleDisabled() {
    setOpen(false);
    const action = disabled ? "enable" : "disable";
    const result = await Swal.fire({
      icon: disabled ? "question" : "warning",
      title: `${disabled ? "Enable" : "Disable"} this account?`,
      text: disabled
        ? `${email} will be able to sign in again.`
        : `${email} will be blocked from signing in.`,
      showCancelButton: true,
      confirmButtonText: `Yes, ${action} account`,
      ...swalButtons,
    });
    if (result.isConfirmed) runServerAction(() => setUserDisabledAction(userId, !disabled));
  }

  async function changeRole() {
    setOpen(false);
    const nextRole = role === "ADMIN" ? "USER" : "ADMIN";
    const result = await Swal.fire({
      icon: "question",
      title: `${nextRole === "ADMIN" ? "Make admin" : "Change to user"}?`,
      text: nextRole === "ADMIN"
        ? `${email} will be marked as an admin. Admin access is controlled by the database role.`
        : `${email} will be marked as a regular user.`,
      showCancelButton: true,
      confirmButtonText: nextRole === "ADMIN" ? "Make admin" : "Change role",
      ...swalButtons,
    });
    if (result.isConfirmed) runServerAction(() => setUserRoleAction(userId, nextRole));
  }

  async function deleteUser() {
    setOpen(false);
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete this user?",
      text: "This permanently removes the Firebase account and its ScoreWell record.",
      input: "text",
      inputLabel: `Type ${email} to confirm`,
      inputPlaceholder: email,
      showCancelButton: true,
      confirmButtonText: "Delete user",
      ...swalButtons,
      customClass: {
        ...swalButtons.customClass,
        confirmButton: "scorewell-swal-danger",
      },
      inputValidator: (value) => value !== email ? `Type ${email} exactly to continue.` : undefined,
    });
    if (result.isConfirmed) runServerAction(() => deleteUserAction(userId));
  }

  return (
    <div ref={menuRef} className="relative flex justify-end">
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Manage ${name?.trim() || email}`}
        aria-expanded={open}
        disabled={pending}
        onClick={toggleMenu}
        className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink-body disabled:opacity-50"
      >
        {pending ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <MoreHorizontal className="h-5 w-5" />}
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div
          ref={portalMenuRef}
          className="fixed z-[70] w-60 rounded-xl border border-line bg-surface p-1.5 shadow-xl"
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <button type="button" onClick={editName} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink-body hover:bg-surface-sunken">
            <Edit3 className="h-4 w-4 text-ink-muted" /> Edit user name
          </button>
          <button type="button" onClick={resetPassword} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink-body hover:bg-surface-sunken">
            <KeyRound className="h-4 w-4 text-ink-muted" /> Send password reset link
          </button>
          <button type="button" onClick={toggleDisabled} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink-body hover:bg-surface-sunken">
            {disabled ? <Check className="h-4 w-4 text-emerald-600" /> : <ShieldOff className="h-4 w-4 text-amber-600" />}
            {disabled ? "Enable user account" : "Disable user account"}
          </button>
          <button type="button" onClick={changeRole} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink-body hover:bg-surface-sunken">
            {role === "ADMIN" ? <UserRound className="h-4 w-4 text-ink-muted" /> : <ShieldCheck className="h-4 w-4 text-ink-muted" />}
            {role === "ADMIN" ? "Change to user" : "Make admin"}
          </button>
          <div className="my-1 border-t border-line" />
          <button type="button" onClick={deleteUser} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-700 hover:bg-red-50">
            <Trash2 className="h-4 w-4" /> Delete user
          </button>
        </div>,
        document.body,
      )}
    </div>
  );
}
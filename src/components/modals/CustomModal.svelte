<script lang="ts">
    import type {modalSize} from "$util/types";

    export let open = false;
    export let title = "Modal Title";
    export let size: modalSize = "medium";

    // Close modal on clicking outside
    const handleBackdropClick = (event: any) => {
        if (event.target === event.currentTarget) {
            open = false;
        }
    };

    // Close modal on ESC
    const handleKeydown = (event: any) => {
        if (event.key === "Escape") {
            open = false;
        }
    };

    if (open) window.addEventListener("keydown", handleKeydown);
    else window.removeEventListener("keydown", handleKeydown);
</script>

{#if open}
    <div class="modal-backdrop" on:click={handleBackdropClick}>
        <div class="modal-window {size}">
            <div class="modal-header">
                <h3>{title}</h3>
                <button class="close-btn" on:click={() => (open = false)}>✕</button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-window {
        background: white;
        border-radius: 10px;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: 90%;
        max-width: 500px;
        transition: transform 0.3s ease-in-out;
        animation: modal-slide-down 0.3s ease;
    }

    .modal-window.small {
        max-width: 300px;
    }
    .modal-window.medium {
        max-width: 500px;
    }
    .modal-window.large {
        max-width: 800px;
    }

    @keyframes modal-slide-down {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background-color: #f1f1f1;
        border-bottom: 1px solid #ddd;
        color: #242424;
    }

    .modal-header h3 {
        margin: 0;
        font-size: 1.5rem;
    }

    .close-btn {
        /*background: none;*/
        /*color: #ff5f5f;*/
        border-radius: 8px;
        border: 1px solid #1a1a1a;
        padding: 0.5em 1em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        transition: border-color 0.25s;
        cursor: pointer;
    }

    .close-btn:hover {
        color: #ff0000;
    }

    .modal-body {
        padding: 20px;
    }

    .modal-footer {
        padding: 15px 20px;
        border-top: 1px solid #ddd;
        text-align: right;
        background-color: #f1f1f1;
    }
</style>

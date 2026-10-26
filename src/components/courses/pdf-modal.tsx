export function PdfModal() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2
        id="modal-title"
        className="m-0 mb-5 text-base sm:text-2xl font-semibold"
      >
        Course Exercise / Reference Files
      </h2>
      <div className="flex justify-between p-[12px_15px] text-muted-foreground bg-muted text-[12px]">
        <span>PDF preview</span>
        <span>Fit to page ⌕ ＋ −</span>
      </div>
      <div className="w-[min(100%,900px)] flex-1 overflow-auto min-h-110 mx-auto mt-4 p-[48px_38px] border border-border bg-card shadow-sm">
        <div className="grid gap-5">
          <i className="block h-2.5 rounded-sm bg-muted" />
          <i className="block h-2.5 rounded-sm bg-muted w-[78%]" />
          <i className="block h-2.5 rounded-sm bg-muted" />
          <i className="block h-2.5 rounded-sm bg-muted w-[88%]" />
          <i className="block h-2.5 rounded-sm bg-muted" />
          <i className="block h-2.5 rounded-sm bg-muted w-[78%]" />
          <i className="block h-2.5 rounded-sm bg-muted" />
        </div>
        <div className="mt-20 text-muted-foreground text-center text-[13px]">
          Course reference document
        </div>
      </div>
    </div>
  );
}

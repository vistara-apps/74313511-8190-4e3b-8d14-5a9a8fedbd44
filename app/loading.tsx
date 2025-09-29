export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full animate-spin mx-auto flex items-center justify-center">
          <div className="w-8 h-8 bg-bg rounded-full"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-glow">Loading EduSpin</h2>
          <p className="text-fg text-opacity-70">Preparing your learning adventure...</p>
        </div>
      </div>
    </div>
  );
}

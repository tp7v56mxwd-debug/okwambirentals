import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-8 md:p-12 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Rental Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                By renting a vehicle from Okwambi Rentals, you agree to these terms and conditions. The rental period begins at the time specified in your booking confirmation and ends when the vehicle is returned to our designated location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Driver Requirements</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                To rent a vehicle, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Be at least 18 years of age</li>
                <li>Hold a valid driver's license for at least 2 years</li>
                <li>Present a valid government-issued ID or passport</li>
                <li>Provide a credit card for the security deposit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Security Deposit</h2>
              <p className="text-muted-foreground leading-relaxed">
                A refundable security deposit is required for all rentals. The deposit amount varies by vehicle type and will be held on your credit card. The deposit will be refunded within 7-10 business days after the vehicle is returned in good condition.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Vehicle Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                The rented vehicle must be used responsibly and in accordance with local laws. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Operate the vehicle safely and within designated areas</li>
                <li>Not use the vehicle under the influence of alcohol or drugs</li>
                <li>Not allow unauthorized persons to operate the vehicle</li>
                <li>Not use the vehicle for racing or competitive events</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Insurance and Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Basic insurance is included in the rental price, covering damage to the vehicle and third-party liability. You are responsible for any damage exceeding the insurance coverage limits. Personal accident insurance is available for an additional fee.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Fuel Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vehicles are provided with a full tank of fuel and must be returned with a full tank. Failure to refuel will result in a refueling charge plus an administrative fee.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Cancellation Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Free cancellation is available up to 24 hours before your scheduled booking time. Cancellations made within 24 hours of the booking time are subject to a 50% cancellation fee. No-shows will be charged the full rental amount.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Late Returns</h2>
              <p className="text-muted-foreground leading-relaxed">
                Late returns will be charged at an hourly rate. If you need to extend your rental period, please contact us at least 2 hours before your scheduled return time, subject to availability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Damage and Loss</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for any damage to or loss of the vehicle during the rental period. Report any incidents immediately to our staff. Failure to report damage may result in additional charges.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these terms, please contact us at info@okwambi.ao or call +244 923 456 789.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

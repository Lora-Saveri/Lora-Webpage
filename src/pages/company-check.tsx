import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSelector } from '@/components/ui/language-selector';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { apiService } from '@/services/api';
import { Company } from '@/types';
import { Search, Building2, Users, ArrowRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CompanyCheckPage() {
  const [query, setQuery] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchCompanies = async () => {
      if (query.trim().length < 2) {
        setCompanies([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await apiService.searchCompanies(query);
        setCompanies(results);
      } catch (error) {
        console.error('Error searching companies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchCompanies, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    localStorage.setItem('aihr4u_company', JSON.stringify(company));
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleRegisterCompany = () => {
    // Navigate to company registration
    navigate('/register-company');
  };

 return (
<div className='h-screen flex flex-row items-center'>
  <div className="h-screen px-4 sm:px-6 md:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"> {/* ✅ Responsive padding */}
    <div className="absolute top-4 right-4">
      <LanguageSelector />
    </div>

    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center w-full max-w-full lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 space-y-8" 
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl shadow-lg"
          >
            <Building2 className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"> {/* ✅ Responsive font size */}
              AIHR4U
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-2"> {/* ✅ Responsive text */}
              {t('companyCheck.title')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('companyCheck.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg w-full max-w-full mx-auto"> {/* ✅ Full width responsive card */}
            <CardHeader>
              <CardTitle className="text-center">
                {t('companyCheck.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-4 sm:p-6"> {/* ✅ Responsive padding */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={t('companyCheck.placeholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  autoFocus
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <LoadingSpinner size="sm" />
                  </div>
                )}
              </div>

              {/* Company Suggestions */}
              <AnimatePresence>
                {companies.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {t('companyCheck.suggestions')}
                    </p>
                    <div className="space-y-2 max-h-60 overflow-y-auto sm:space-y-3"> {/* ✅ Responsive vertical gap */}
                      {companies.map((company, index) => (
                        <motion.div
                          key={company.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                            "hover:bg-primary/5 hover:border-primary hover:shadow-md",
                            selectedCompany?.id === company.id &&
                              "bg-primary/10 border-primary ring-2 ring-primary/20"
                          )}
                          onClick={() => handleCompanySelect(company)}
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"> {/* ✅ Mobile-first layout */}
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-primary" />
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                  {company.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span>{company.industry}</span>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    <span>{company.employeeCount} employees</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 self-end sm:self-center" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* No Results */}
              {query.length >= 2 && companies.length === 0 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                    <Building2 className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {t('companyCheck.notFound')}
                    </p>
                    <Button onClick={handleRegisterCompany} className="gap-2">
                      <Plus className="w-4 h-4" />
                      {t('companyCheck.register')}
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  </div>
</div>
);

} 